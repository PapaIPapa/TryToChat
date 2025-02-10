using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace AhuenniyChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(int receiverId, string message)
        {
            try
            {
                var userName = Context.User?.Identity?.Name;
                if (string.IsNullOrEmpty(userName))
                {
                    throw new Exception("User is not authenticated.");
                }

                await Clients.User(receiverId.ToString()).SendAsync("ReceiveMessage", userName, message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw; // Перебрасываем исключение, чтобы клиент мог его обработать
            }
        }
    }
}
