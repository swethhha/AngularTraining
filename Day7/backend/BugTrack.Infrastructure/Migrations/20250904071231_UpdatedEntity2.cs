﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugTrack.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedEntity2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Users_UserId",
                table: "Bugs");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Bugs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_Users_UserId",
                table: "Bugs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Users_UserId",
                table: "Bugs");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Bugs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_Users_UserId",
                table: "Bugs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
