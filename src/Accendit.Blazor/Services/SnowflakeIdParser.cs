using System.Globalization;

namespace Accendit.Blazor.Services;

public static class SnowflakeIdParser
{
    public static bool TryParse(string? value, out long id)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            id = 0;
            return false;
        }

        return long.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out id) && id > 0;
    }
}