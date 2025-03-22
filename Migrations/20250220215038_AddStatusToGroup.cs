using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AhuenniyChat.Migrations
{
    public partial class AddStatusToGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "InCall",
                table: "Group",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InCall",
                table: "Group");
        }
    }
}
