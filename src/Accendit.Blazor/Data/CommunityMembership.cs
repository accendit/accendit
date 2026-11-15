namespace Accendit.Blazor.Data;

public class CommunityMembership
{
    public long Id { get; set; }

    public long CommunityId { get; set; }

    public Community Community { get; set; } = null!;

    public required string UserId { get; set; }

    public ApplicationUser User { get; set; } = null!;

    public CommunityRole Role { get; set; }

    public DateTimeOffset JoinedAt { get; set; }
}