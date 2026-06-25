using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.API.Migrations
{
    /// <inheritdoc />
    public partial class groubid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Lang",
                table: "Projects",
                type: "nvarchar(2)",
                maxLength: 2,
                nullable: false,
                defaultValue: "en",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Lang",
                table: "Philosophies",
                type: "nvarchar(2)",
                maxLength: 2,
                nullable: false,
                defaultValue: "en",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "Philosophies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Lang",
                table: "JourneyItems",
                type: "nvarchar(2)",
                maxLength: 2,
                nullable: false,
                defaultValue: "en",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "JourneyItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Lang",
                table: "HeroSections",
                type: "nvarchar(2)",
                maxLength: 2,
                nullable: false,
                defaultValue: "en",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "HeroSections",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_GroupId",
                table: "Projects",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_Lang",
                table: "Projects",
                column: "Lang");

            migrationBuilder.CreateIndex(
                name: "IX_Philosophies_GroupId",
                table: "Philosophies",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Philosophies_Lang",
                table: "Philosophies",
                column: "Lang");

            migrationBuilder.CreateIndex(
                name: "IX_JourneyItems_GroupId",
                table: "JourneyItems",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_JourneyItems_Lang",
                table: "JourneyItems",
                column: "Lang");

            migrationBuilder.CreateIndex(
                name: "IX_HeroSections_GroupId",
                table: "HeroSections",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_HeroSections_Lang",
                table: "HeroSections",
                column: "Lang");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Projects_GroupId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_Lang",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Philosophies_GroupId",
                table: "Philosophies");

            migrationBuilder.DropIndex(
                name: "IX_Philosophies_Lang",
                table: "Philosophies");

            migrationBuilder.DropIndex(
                name: "IX_JourneyItems_GroupId",
                table: "JourneyItems");

            migrationBuilder.DropIndex(
                name: "IX_JourneyItems_Lang",
                table: "JourneyItems");

            migrationBuilder.DropIndex(
                name: "IX_HeroSections_GroupId",
                table: "HeroSections");

            migrationBuilder.DropIndex(
                name: "IX_HeroSections_Lang",
                table: "HeroSections");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Philosophies");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "JourneyItems");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "HeroSections");

            migrationBuilder.AlterColumn<string>(
                name: "Lang",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2)",
                oldMaxLength: 2,
                oldDefaultValue: "en");

            migrationBuilder.AlterColumn<string>(
                name: "Lang",
                table: "Philosophies",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2)",
                oldMaxLength: 2,
                oldDefaultValue: "en");

            migrationBuilder.AlterColumn<string>(
                name: "Lang",
                table: "JourneyItems",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2)",
                oldMaxLength: 2,
                oldDefaultValue: "en");

            migrationBuilder.AlterColumn<string>(
                name: "Lang",
                table: "HeroSections",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2)",
                oldMaxLength: 2,
                oldDefaultValue: "en");
        }
    }
}
