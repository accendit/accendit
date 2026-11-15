using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Accendit.Blazor.Data.Migrations;

/// <inheritdoc />
public partial class _20261115043559_UseSnowflakeIds : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterColumn<long>(
            name: "CommunityId",
            table: "Topics",
            type: "INTEGER",
            nullable: false,
            oldClrType: typeof(Guid),
            oldType: "TEXT");

        migrationBuilder.AlterColumn<long>(
            name: "Id",
            table: "Topics",
            type: "INTEGER",
            nullable: false,
            oldClrType: typeof(Guid),
            oldType: "TEXT");

        migrationBuilder.AlterColumn<long>(
            name: "TopicId",
            table: "TopicComments",
            type: "INTEGER",
            nullable: false,
            oldClrType: typeof(Guid),
            oldType: "TEXT");

        migrationBuilder.AlterColumn<long>(
            name: "ParentCommentId",
            table: "TopicComments",
            type: "INTEGER",
            nullable: true,
            oldClrType: typeof(Guid),
            oldType: "TEXT",
            oldNullable: true);

        migrationBuilder.AlterColumn<long>(
            name: "Id",
            table: "TopicComments",
            type: "INTEGER",
            nullable: false,
            oldClrType: typeof(Guid),
            oldType: "TEXT");

        migrationBuilder.AlterColumn<long>(
            name: "CommunityId",
            table: "CommunityMemberships",
            type: "INTEGER",
            nullable: false,
            oldClrType: typeof(Guid),
            oldType: "TEXT");

        migrationBuilder.AlterColumn<long>(
            name: "Id",
            table: "CommunityMemberships",
            type: "INTEGER",
            nullable: false,
            oldClrType: typeof(Guid),
            oldType: "TEXT");

        migrationBuilder.AlterColumn<long>(
            name: "Id",
            table: "Communities",
            type: "INTEGER",
            nullable: false,
            oldClrType: typeof(Guid),
            oldType: "TEXT");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterColumn<Guid>(
            name: "CommunityId",
            table: "Topics",
            type: "TEXT",
            nullable: false,
            oldClrType: typeof(long),
            oldType: "INTEGER");

        migrationBuilder.AlterColumn<Guid>(
            name: "Id",
            table: "Topics",
            type: "TEXT",
            nullable: false,
            oldClrType: typeof(long),
            oldType: "INTEGER");

        migrationBuilder.AlterColumn<Guid>(
            name: "TopicId",
            table: "TopicComments",
            type: "TEXT",
            nullable: false,
            oldClrType: typeof(long),
            oldType: "INTEGER");

        migrationBuilder.AlterColumn<Guid>(
            name: "ParentCommentId",
            table: "TopicComments",
            type: "TEXT",
            nullable: true,
            oldClrType: typeof(long),
            oldType: "INTEGER",
            oldNullable: true);

        migrationBuilder.AlterColumn<Guid>(
            name: "Id",
            table: "TopicComments",
            type: "TEXT",
            nullable: false,
            oldClrType: typeof(long),
            oldType: "INTEGER");

        migrationBuilder.AlterColumn<Guid>(
            name: "CommunityId",
            table: "CommunityMemberships",
            type: "TEXT",
            nullable: false,
            oldClrType: typeof(long),
            oldType: "INTEGER");

        migrationBuilder.AlterColumn<Guid>(
            name: "Id",
            table: "CommunityMemberships",
            type: "TEXT",
            nullable: false,
            oldClrType: typeof(long),
            oldType: "INTEGER");

        migrationBuilder.AlterColumn<Guid>(
            name: "Id",
            table: "Communities",
            type: "TEXT",
            nullable: false,
            oldClrType: typeof(long),
            oldType: "INTEGER");
    }
}
