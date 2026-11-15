namespace Accendit.Blazor.Components.Account;

internal static partial class IdentityComponentsEndpointRouteBuilderExtensions
{
    // These endpoints are required by the Identity Razor components defined in the /Components/Account/Pages directory of this project.
    public static IEndpointConventionBuilder MapAdditionalIdentityEndpoints(this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var accountGroup = endpoints.MapGroup("/Account");

        MapPerformExternalLogin(accountGroup);
        MapLogout(accountGroup);
        MapPasskeyCreationOptions(accountGroup);
        MapPasskeyRequestOptions(accountGroup);

        var manageGroup = accountGroup.MapGroup("/Manage").RequireAuthorization();

        MapLinkExternalLogin(manageGroup);
        MapDownloadPersonalData(manageGroup, endpoints.ServiceProvider);

        return accountGroup;
    }
}
