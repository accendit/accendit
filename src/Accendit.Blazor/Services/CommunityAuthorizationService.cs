using Accendit.Blazor.Data;
using Microsoft.EntityFrameworkCore;

namespace Accendit.Blazor.Services;

public sealed class CommunityAuthorizationService(ApplicationDbContext db)
{
    public async Task<CommunityRole?> GetUserRoleAsync(long communityId, string? userId, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(userId))
        {
            return null;
        }

        var membership = await db.CommunityMemberships
            .AsNoTracking()
            .FirstOrDefaultAsync(m => m.CommunityId == communityId && m.UserId == userId, cancellationToken);

        return membership?.Role;
    }

    public async Task<bool> IsOwnerOrModeratorAsync(long communityId, string? userId, CancellationToken cancellationToken = default)
    {
        var role = await GetUserRoleAsync(communityId, userId, cancellationToken);
        return role is CommunityRole.Owner or CommunityRole.Moderator;
    }

    public async Task<bool> CanModifyTopicAsync(Topic topic, string? userId, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(userId))
        {
            return false;
        }

        if (string.Equals(topic.AuthorId, userId, StringComparison.Ordinal))
        {
            return true;
        }

        return await IsOwnerOrModeratorAsync(topic.CommunityId, userId, cancellationToken);
    }

    public Task<bool> CanDeleteTopicAsync(Topic topic, string? userId, CancellationToken cancellationToken = default)
        => CanModifyTopicAsync(topic, userId, cancellationToken);

    public Task<bool> CanModifyCommentAsync(TopicComment comment, string? userId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            return Task.FromResult(false);
        }

        return Task.FromResult(string.Equals(comment.AuthorId, userId, StringComparison.Ordinal));
    }

    public async Task<bool> CanDeleteCommentAsync(TopicComment comment, string? userId, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(userId))
        {
            return false;
        }

        if (string.Equals(comment.AuthorId, userId, StringComparison.Ordinal))
        {
            return true;
        }

        var communityId = await db.Topics.AsNoTracking()
            .Where(t => t.Id == comment.TopicId)
            .Select(t => t.CommunityId)
            .FirstOrDefaultAsync(cancellationToken);

        if (communityId == 0)
        {
            return false;
        }

        return await IsOwnerOrModeratorAsync(communityId, userId, cancellationToken);
    }
}