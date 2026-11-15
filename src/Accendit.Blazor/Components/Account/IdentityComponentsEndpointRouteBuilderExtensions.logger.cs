namespace Accendit.Blazor.Components.Account;

internal static partial class IdentityComponentsEndpointRouteBuilderExtensions
{
    [LoggerMessage(LogLevel.Information, "User with ID '{UserId}' asked for their personal data.")]
    static partial void LogUserWithIdUseridAskedForTheirPersonalData(this ILogger logger, string userId);
}