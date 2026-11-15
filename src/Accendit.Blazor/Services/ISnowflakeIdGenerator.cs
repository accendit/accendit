namespace Accendit.Blazor.Services;

public interface ISnowflakeIdGenerator
{
    long NextId();
}