using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.API.Migrations
{
    /// <inheritdoc />
    public partial class addwebandapp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ViewLink",
                table: "Projects",
                newName: "WebsiteLink");

            migrationBuilder.AddColumn<string>(
                name: "AppLink",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppLink",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "WebsiteLink",
                table: "Projects",
                newName: "ViewLink");
        }
    }
}
