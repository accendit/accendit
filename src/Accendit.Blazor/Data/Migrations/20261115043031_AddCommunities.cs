using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Accendit.Blazor.Data.Migrations;

/// <inheritdoc />
public partial class _20261115043031_AddCommunities : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Communities",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                Name = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                Description = table.Column<string>(type: "TEXT", nullable: true),
                CreatedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Communities", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "CommunityMemberships",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                CommunityId = table.Column<Guid>(type: "TEXT", nullable: false),
                UserId = table.Column<string>(type: "TEXT", nullable: false),
                Role = table.Column<int>(type: "INTEGER", nullable: false),
                JoinedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_CommunityMemberships", x => x.Id);
                table.ForeignKey(
                    name: "FK_CommunityMemberships_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_CommunityMemberships_Communities_CommunityId",
                    column: x => x.CommunityId,
                    principalTable: "Communities",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Topics",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                CommunityId = table.Column<Guid>(type: "TEXT", nullable: false),
                AuthorId = table.Column<string>(type: "TEXT", nullable: false),
                Title = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                Content = table.Column<string>(type: "TEXT", nullable: false),
                CreatedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                UpdatedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Topics", x => x.Id);
                table.ForeignKey(
                    name: "FK_Topics_AspNetUsers_AuthorId",
                    column: x => x.AuthorId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Restrict);
                table.ForeignKey(
                    name: "FK_Topics_Communities_CommunityId",
                    column: x => x.CommunityId,
                    principalTable: "Communities",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "TopicComments",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                TopicId = table.Column<Guid>(type: "TEXT", nullable: false),
                ParentCommentId = table.Column<Guid>(type: "TEXT", nullable: true),
                AuthorId = table.Column<string>(type: "TEXT", nullable: false),
                Content = table.Column<string>(type: "TEXT", nullable: false),
                CreatedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                UpdatedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_TopicComments", x => x.Id);
                table.ForeignKey(
                    name: "FK_TopicComments_AspNetUsers_AuthorId",
                    column: x => x.AuthorId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Restrict);
                table.ForeignKey(
                    name: "FK_TopicComments_TopicComments_ParentCommentId",
                    column: x => x.ParentCommentId,
                    principalTable: "TopicComments",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_TopicComments_Topics_TopicId",
                    column: x => x.TopicId,
                    principalTable: "Topics",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Communities_Name",
            table: "Communities",
            column: "Name",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_CommunityMemberships_CommunityId_UserId",
            table: "CommunityMemberships",
            columns: new[] { "CommunityId", "UserId" },
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_CommunityMemberships_UserId",
            table: "CommunityMemberships",
            column: "UserId");

        migrationBuilder.CreateIndex(
            name: "IX_TopicComments_AuthorId",
            table: "TopicComments",
            column: "AuthorId");

        migrationBuilder.CreateIndex(
            name: "IX_TopicComments_ParentCommentId",
            table: "TopicComments",
            column: "ParentCommentId");

        migrationBuilder.CreateIndex(
            name: "IX_TopicComments_TopicId",
            table: "TopicComments",
            column: "TopicId");

        migrationBuilder.CreateIndex(
            name: "IX_Topics_AuthorId",
            table: "Topics",
            column: "AuthorId");

        migrationBuilder.CreateIndex(
            name: "IX_Topics_CommunityId",
            table: "Topics",
            column: "CommunityId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "CommunityMemberships");

        migrationBuilder.DropTable(
            name: "TopicComments");

        migrationBuilder.DropTable(
            name: "Topics");

        migrationBuilder.DropTable(
            name: "Communities");
    }
}
