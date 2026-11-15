using System.Globalization;
using Accendit.Blazor.Data;

namespace Accendit.Blazor.Services;

public static class CommunityLitMapper
{
    public static object ToCommentNode(
        TopicComment comment,
        IReadOnlyDictionary<long, bool> canEdit,
        IReadOnlyDictionary<long, bool> canDelete)
    {
        return new
        {
            id = comment.Id.ToString(CultureInfo.InvariantCulture),
            content = comment.Content,
            authorUserName = comment.Author.UserName ?? "unknown",
            createdAt = comment.CreatedAt.LocalDateTime.ToString("g", CultureInfo.CurrentCulture),
            canEdit = canEdit.GetValueOrDefault(comment.Id),
            canDelete = canDelete.GetValueOrDefault(comment.Id),
            replies = comment.Replies
                .Select(r => ToCommentNode(r, canEdit, canDelete))
                .ToList()
        };
    }

    public static object ToTopicListItem(Topic topic) => new
    {
        id = topic.Id.ToString(CultureInfo.InvariantCulture),
        title = topic.Title,
        createdAt = topic.CreatedAt.LocalDateTime.ToString("g", CultureInfo.CurrentCulture)
    };
}