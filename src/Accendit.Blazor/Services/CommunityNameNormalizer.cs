namespace Accendit.Blazor.Services;

public static class CommunityNameNormalizer
{
    public static bool TryNormalize(string? input, out string normalized)
    {
        normalized = string.Empty;
        if (string.IsNullOrWhiteSpace(input))
        {
            return false;
        }

        var candidate = input.Trim().ToLowerInvariant();
        if (candidate.Length is 0 or > 64)
        {
            return false;
        }

        foreach (var c in candidate)
        {
            if (c is (>= 'a' and <= 'z') or (>= '0' and <= '9') or '-')
            {
                continue;
            }

            return false;
        }

        if (candidate.StartsWith('-', StringComparison.Ordinal) || candidate.EndsWith('-', StringComparison.Ordinal))
        {
            return false;
        }

        normalized = candidate;
        return true;
    }
}