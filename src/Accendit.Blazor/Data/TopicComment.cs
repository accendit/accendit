namespace Accendit.Blazor.Data;

public class TopicComment
{
    public long Id { get; set; }

    public long TopicId { get; set; }

    public Topic Topic { get; set; } = null!;

    public long? ParentCommentId { get; set; }

    public TopicComment? ParentComment { get; set; }

    public ICollection<TopicComment> Replies { get; set; } = [];

    public required string AuthorId { get; set; }

    public ApplicationUser Author { get; set; } = null!;

    public required string Content { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset? UpdatedAt { get; set; }
}