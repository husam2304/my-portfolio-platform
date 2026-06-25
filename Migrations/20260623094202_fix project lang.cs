using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.API.Migrations
{
    /// <inheritdoc />
    public partial class fixprojectlang : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Projects_GroupId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_Lang",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "CaseStudyLabel",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Lang",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "OverviewDescription",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "OverviewTitle",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Projects");

            migrationBuilder.CreateTable(
                name: "ProjectLocalises",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CaseStudyLabel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OverviewTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OverviewDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lang = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectLocalises", x => x.id);
                    table.ForeignKey(
                        name: "FK_ProjectLocalises_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectLocalises_ProjectId",
                table: "ProjectLocalises",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectLocalises");

            migrationBuilder.AddColumn<string>(
                name: "CaseStudyLabel",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Lang",
                table: "Projects",
                type: "nvarchar(2)",
                maxLength: 2,
                nullable: false,
                defaultValue: "en");

            migrationBuilder.AddColumn<string>(
                name: "OverviewDescription",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OverviewTitle",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_GroupId",
                table: "Projects",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_Lang",
                table: "Projects",
                column: "Lang");
        }
    }
}
