using System.ComponentModel.DataAnnotations;

namespace Accendit.Blazor.Data;

public class Topic
{
    public long Id { get; set; }

    public long CommunityId { get; set; }

    public Community Community { get; set; } = null!;

    public required string AuthorId { get; set; }

    public ApplicationUser Author { get; set; } = null!;

    [MaxLength(50)]
    public required string Title { get; set; }

    public required string Content { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset? UpdatedAt { get; set; }

    public ICollection<TopicComment> Comments { get; set; } = [];
}