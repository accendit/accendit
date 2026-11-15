using System.ComponentModel.DataAnnotations;

namespace Accendit.Blazor.Data;

public class Community
{
    public long Id { get; set; }

    [MaxLength(64)]
    public required string Name { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public ICollection<CommunityMembership> Memberships { get; set; } = [];

    public ICollection<Topic> Topics { get; set; } = [];
}