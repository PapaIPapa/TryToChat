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


        public async Task SendMessage(int receiverId, int senderId, string messageText)
        {
            try
            {

                if (senderId != null)
                {
                    Console.WriteLine($"Отправитель: {senderId}, Получатель: {receiverId}");
                }

                // Отправка сообщения конкретному пользователю
                await Clients.User(receiverId.ToString()).SendAsync("ReceiveMessage", senderId, messageText);
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task SendMessageToGroup(int receiverId, string groupName, string senderName, string message)
        {

            try
            {

                Console.WriteLine($"{senderName} отправил");
                await Clients.User(receiverId.ToString()).SendAsync("ReceiveMessageFromGroup", groupName, senderName, message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            
        }

        public async Task JoinGroup(int userId, string groupName)
        {
            try {
                await Groups.AddToGroupAsync(userId.ToString(), groupName);
                Console.WriteLine($"{userId} has joined the group {groupName}.");
                await Clients.Group(groupName).SendAsync("ReceiveMessage", "System", $"{userId} has joined the group.");
            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }
            
        }

        public async Task LeaveGroup(int userId, string groupName)
        {
            await Groups.RemoveFromGroupAsync(userId.ToString(), groupName);
            await Clients.Group(groupName).SendAsync("ReceiveMessage", "System", $"{userId} has left the group.");
        }
    }


}
