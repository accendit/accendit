using Microsoft.Extensions.Options;

namespace Accendit.Blazor.Services;

/// <summary>
/// 64-bit Snowflake IDs: 41-bit timestamp, 10-bit worker, 12-bit sequence.
/// </summary>
public sealed class SnowflakeIdGenerator : ISnowflakeIdGenerator
{
    private const int WorkerIdBits = 10;
    private const int SequenceBits = 12;

    private const long MaxWorkerId = (1L << WorkerIdBits) - 1;
    private const long MaxSequence = (1L << SequenceBits) - 1;

    private const int WorkerIdShift = SequenceBits;
    private const int TimestampShift = SequenceBits + WorkerIdBits;

    private static readonly long EpochMilliseconds =
        new DateTimeOffset(2024, 1, 1, 0, 0, 0, TimeSpan.Zero).ToUnixTimeMilliseconds();

    private readonly Lock _sync = new();
    private readonly long _workerId;
    private long _lastTimestamp = -1L;
    private long _sequence;

    public SnowflakeIdGenerator(IOptions<SnowflakeOptions> options)
    {
        var workerId = options.Value.WorkerId;
        if (workerId is < 0 or > (int)MaxWorkerId)
        {
            throw new ArgumentOutOfRangeException(
                nameof(options),
                workerId,
                $"Worker ID must be between 0 and {MaxWorkerId}.");
        }

        _workerId = workerId;
    }

    public long NextId()
    {
        lock (_sync)
        {
            var timestamp = CurrentTimestamp();
            if (timestamp < _lastTimestamp)
            {
                throw new InvalidOperationException(
                    "Clock moved backwards; refusing to generate an ID until time catches up.");
            }

            if (timestamp == _lastTimestamp)
            {
                _sequence = (_sequence + 1) & MaxSequence;
                if (_sequence == 0)
                {
                    timestamp = WaitNextMillis(_lastTimestamp);
                }
            }
            else
            {
                _sequence = 0;
            }

            _lastTimestamp = timestamp;

            return ((timestamp - EpochMilliseconds) << TimestampShift)
                | (_workerId << WorkerIdShift)
                | _sequence;
        }
    }

    private static long WaitNextMillis(long lastTimestamp)
    {
        var timestamp = CurrentTimestamp();
        while (timestamp <= lastTimestamp)
        {
            timestamp = CurrentTimestamp();
        }

        return timestamp;
    }

    private static long CurrentTimestamp() => DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
}