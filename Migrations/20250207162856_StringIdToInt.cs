using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AhuenniyChat.Migrations
{
    public partial class StringIdToInt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_SenderId1",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_SenderId1",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SenderId1",
                table: "Message");

            migrationBuilder.AlterColumn<int>(
                name: "SenderId",
                table: "Message",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ReceiverId",
                table: "Message",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Message_SenderId",
                table: "Message",
                column: "SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_SenderId",
                table: "Message",
                column: "SenderId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_SenderId",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_SenderId",
                table: "Message");

            migrationBuilder.AlterColumn<string>(
                name: "SenderId",
                table: "Message",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "ReceiverId",
                table: "Message",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "SenderId1",
                table: "Message",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Message_SenderId1",
                table: "Message",
                column: "SenderId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_SenderId1",
                table: "Message",
                column: "SenderId1",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
