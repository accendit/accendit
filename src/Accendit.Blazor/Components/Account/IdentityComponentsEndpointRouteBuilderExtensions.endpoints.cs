using System.Security.Claims;
using System.Text.Json;
using Accendit.Blazor.Components.Account.Pages;
using Accendit.Blazor.Components.Account.Pages.Manage;
using Accendit.Blazor.Data;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace Accendit.Blazor.Components.Account;

internal static partial class IdentityComponentsEndpointRouteBuilderExtensions
{
    private static void MapPerformExternalLogin(RouteGroupBuilder accountGroup) =>
        accountGroup.MapPost("/PerformExternalLogin", PerformExternalLogin);

    private static ChallengeHttpResult PerformExternalLogin(
        HttpContext context,
        [FromServices] SignInManager<ApplicationUser> signInManager,
        [FromForm] string provider,
        [FromForm] string returnUrl)
    {
        IEnumerable<KeyValuePair<string, StringValues>> query =
        [
            new("ReturnUrl", returnUrl),
            new("Action", ExternalLogin.LoginCallbackAction)
        ];

        var redirectUrl = UriHelper.BuildRelative(
            context.Request.PathBase,
            "/Account/ExternalLogin",
            QueryString.Create(query));

        var properties = signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
        return TypedResults.Challenge(properties, [provider]);
    }

    private static void MapLogout(RouteGroupBuilder accountGroup) =>
        accountGroup.MapPost("/Logout", LogoutAsync);

    private static async Task<IResult> LogoutAsync(
        ClaimsPrincipal user,
        [FromServices] SignInManager<ApplicationUser> signInManager,
        [FromForm] string returnUrl)
    {
        await signInManager.SignOutAsync();
        return TypedResults.LocalRedirect($"~/{returnUrl}");
    }

    private static void MapPasskeyCreationOptions(RouteGroupBuilder accountGroup) =>
        accountGroup.MapPost("/PasskeyCreationOptions", [RequireAntiforgeryToken] (
            HttpContext context,
            [FromServices] UserManager<ApplicationUser> userManager,
            [FromServices] SignInManager<ApplicationUser> signInManager) =>
            PasskeyCreationOptionsAsync(context, userManager, signInManager));

    private static async Task<IResult> PasskeyCreationOptionsAsync(
        HttpContext context,
        [FromServices] UserManager<ApplicationUser> userManager,
        [FromServices] SignInManager<ApplicationUser> signInManager)
    {
        if (GetAntiforgeryValidationError(context) is { } antiforgeryError)
        {
            return antiforgeryError;
        }

        var (user, userError) = await GetRequiredUserAsync(context, userManager);
        if (userError is not null)
        {
            return userError;
        }

        var userId = await userManager.GetUserIdAsync(user);
        var userName = await userManager.GetUserNameAsync(user) ?? "User";
        var optionsJson = await signInManager.MakePasskeyCreationOptionsAsync(new()
        {
            Id = userId,
            Name = userName,
            DisplayName = userName
        });
        return TypedResults.Content(optionsJson, contentType: "application/json");
    }

    private static void MapPasskeyRequestOptions(RouteGroupBuilder accountGroup) =>
        accountGroup.MapPost("/PasskeyRequestOptions", [RequireAntiforgeryToken] (
            HttpContext context,
            [FromServices] UserManager<ApplicationUser> userManager,
            [FromServices] SignInManager<ApplicationUser> signInManager,
            [FromQuery] string? username) =>
            PasskeyRequestOptionsAsync(context, userManager, signInManager, username));

    private static async Task<IResult> PasskeyRequestOptionsAsync(
        HttpContext context,
        [FromServices] UserManager<ApplicationUser> userManager,
        [FromServices] SignInManager<ApplicationUser> signInManager,
        [FromQuery] string? username)
    {
        if (GetAntiforgeryValidationError(context) is { } antiforgeryError)
        {
            return antiforgeryError;
        }

        var user = string.IsNullOrEmpty(username) ? null : await userManager.FindByNameAsync(username);
        var optionsJson = await signInManager.MakePasskeyRequestOptionsAsync(user);
        return TypedResults.Content(optionsJson, contentType: "application/json");
    }

    private static void MapLinkExternalLogin(RouteGroupBuilder manageGroup) =>
        manageGroup.MapPost("/LinkExternalLogin", LinkExternalLoginAsync);

    private static async Task<IResult> LinkExternalLoginAsync(
        HttpContext context,
        [FromServices] SignInManager<ApplicationUser> signInManager,
        [FromForm] string provider)
    {
        await context.SignOutAsync(IdentityConstants.ExternalScheme);

        var redirectUrl = UriHelper.BuildRelative(
            context.Request.PathBase,
            "/Account/Manage/ExternalLogins",
            QueryString.Create("Action", ExternalLogins.LinkLoginCallbackAction));

        var properties = signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl,
            signInManager.UserManager.GetUserId(context.User));
        return TypedResults.Challenge(properties, [provider]);
    }

    private static void MapDownloadPersonalData(RouteGroupBuilder manageGroup, IServiceProvider serviceProvider)
    {
        var downloadLogger = serviceProvider.GetRequiredService<ILoggerFactory>()
            .CreateLogger("DownloadPersonalData");

        manageGroup.MapPost("/DownloadPersonalData", [RequireAntiforgeryToken] (
            HttpContext context,
            [FromServices] UserManager<ApplicationUser> userManager,
            [FromServices] AuthenticationStateProvider authenticationStateProvider) =>
            DownloadPersonalDataAsync(context, userManager, downloadLogger));
    }

    private static async Task<IResult> DownloadPersonalDataAsync(
        HttpContext context,
        UserManager<ApplicationUser> userManager,
        ILogger downloadLogger)
    {
        if (GetAntiforgeryValidationError(context) is { } antiforgeryError)
        {
            return antiforgeryError;
        }

        var (user, userError) = await GetRequiredUserAsync(context, userManager);
        if (userError is not null)
        {
            return userError;
        }

        var userId = await userManager.GetUserIdAsync(user);
        downloadLogger.LogUserWithIdUseridAskedForTheirPersonalData(userId);

        var personalData = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        var personalDataProps = typeof(ApplicationUser).GetProperties()
            .Where(prop => Attribute.IsDefined(prop, typeof(PersonalDataAttribute)));
        foreach (var p in personalDataProps)
        {
            personalData.Add(p.Name, p.GetValue(user)?.ToString() ?? "null");
        }

        var logins = await userManager.GetLoginsAsync(user);
        foreach (var l in logins)
        {
            personalData.Add($"{l.LoginProvider} external login provider key", l.ProviderKey);
        }

        personalData.Add("Authenticator Key", (await userManager.GetAuthenticatorKeyAsync(user))!);
        var fileBytes = JsonSerializer.SerializeToUtf8Bytes(personalData);

        context.Response.Headers.TryAdd("Content-Disposition", "attachment; filename=PersonalData.json");
        return TypedResults.File(fileBytes, contentType: "application/json", fileDownloadName: "PersonalData.json");
    }

    private static IResult? GetAntiforgeryValidationError(HttpContext context)
    {
        var antiforgeryValidationFeature = context.Features.Get<IAntiforgeryValidationFeature>();
        if (antiforgeryValidationFeature is { IsValid: true })
        {
            return null;
        }

        return Results.BadRequest(antiforgeryValidationFeature?.Error?.Message ??
                                  "Antiforgery validation failed.");
    }

    private static async Task<(ApplicationUser User, IResult? Error)> GetRequiredUserAsync(
        HttpContext context,
        UserManager<ApplicationUser> userManager)
    {
        var user = await userManager.GetUserAsync(context.User);
        if (user is not null)
        {
            return (user, null);
        }

        return (null!, Results.NotFound($"Unable to load user with ID '{userManager.GetUserId(context.User)}'."));
    }
}
