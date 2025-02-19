using AhuenniyChat.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace AhuenniyChat.Hubs
{
    public class ChatHub : Hub
    {

        public override Task OnConnectedAsync()
        {
            var actualUserId = Context.UserIdentifier;
            Console.WriteLine($"[ChatHub] User connected with UserIdentifier = {actualUserId}");
            return base.OnConnectedAsync();
        }


        public async Task SendMessage(int receiverId, string senderName, string messageText)
        {
            try
            {
                // Отправка сообщения конкретному пользователю
                await Clients.User(receiverId.ToString()).SendAsync("ReceiveMessage", senderName, messageText);
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task SendMessageToGroup(string groupName, string senderName, string message)
        {
            await Clients.Group(groupName).SendAsync("ReceiveMessage", senderName, message);
        }

        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("ReceiveMessage", "System", $"{Context.ConnectionId} has joined the group.");
        }

        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("ReceiveMessage", "System", $"{Context.ConnectionId} has left the group.");
        }
    }


}
