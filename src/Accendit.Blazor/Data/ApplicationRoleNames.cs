namespace Accendit.Blazor.Data;

public static class ApplicationRoleNames
{
    public const string Admin = "Admin";
    public const string Member = "Member";

    public static IReadOnlyList<string> All { get; } = [Admin, Member];
}