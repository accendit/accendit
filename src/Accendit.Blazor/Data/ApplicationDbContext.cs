using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Accendit.Blazor.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : IdentityDbContext<ApplicationUser, IdentityRole, string>(options)
{
    public DbSet<Community> Communities => Set<Community>();
    public DbSet<CommunityMembership> CommunityMemberships => Set<CommunityMembership>();
    public DbSet<Topic> Topics => Set<Topic>();
    public DbSet<TopicComment> TopicComments => Set<TopicComment>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Community>(entity =>
        {
            entity.Property(c => c.Id).ValueGeneratedNever();
            entity.HasIndex(c => c.Name).IsUnique();
        });

        builder.Entity<CommunityMembership>(entity =>
        {
            entity.Property(m => m.Id).ValueGeneratedNever();
            entity.HasIndex(m => new { m.CommunityId, m.UserId }).IsUnique();
            entity.HasOne(m => m.Community)
                .WithMany(c => c.Memberships)
                .HasForeignKey(m => m.CommunityId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(m => m.User)
                .WithMany()
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<Topic>(entity =>
        {
            entity.Property(t => t.Id).ValueGeneratedNever();
            entity.HasOne(t => t.Community)
                .WithMany(c => c.Topics)
                .HasForeignKey(t => t.CommunityId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(t => t.Author)
                .WithMany()
                .HasForeignKey(t => t.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<TopicComment>(entity =>
        {
            entity.Property(c => c.Id).ValueGeneratedNever();
            entity.HasOne(c => c.Topic)
                .WithMany(t => t.Comments)
                .HasForeignKey(c => c.TopicId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(c => c.ParentComment)
                .WithMany(c => c.Replies)
                .HasForeignKey(c => c.ParentCommentId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(c => c.Author)
                .WithMany()
                .HasForeignKey(c => c.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}