using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AhuenniyChat.Migrations
{
    public partial class AddSenderRecipient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RecipientId",
                table: "Message",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SenderId1",
                table: "Message",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Message_RecipientId",
                table: "Message",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_Message_SenderId1",
                table: "Message",
                column: "SenderId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_RecipientId",
                table: "Message",
                column: "RecipientId",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_SenderId1",
                table: "Message",
                column: "SenderId1",
                principalTable: "User",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_RecipientId",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_SenderId1",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_RecipientId",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_SenderId1",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "RecipientId",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SenderId1",
                table: "Message");
        }
    }
}
