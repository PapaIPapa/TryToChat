using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace AhuenniyChat.Hubs
{
    public class CallHub : Hub
    {
        // Отправка SDP предложения выбранному пользователю
        public async Task SendOffer(int targetUserId, string offer, object currentUser)
        {
            var userId = Convert.ToString(targetUserId);
            await Clients.User(userId).SendAsync("ReceiveOffer", targetUserId, offer, currentUser);
        }

        // Отправка SDP ответа выбранному пользователю
        public async Task SendAnswer(int targetUserId, string answer)
        {
            Console.WriteLine( "Тот самый  отправил ответ к " + targetUserId);
            var userId = Convert.ToString(targetUserId);
            await Clients.User(userId).SendAsync("ReceiveAnswer", answer);
        }

        // Отправка ICE кандидата выбранному пользователю
        public async Task SendIceCandidate(int targetUserId, string candidate)
        {
            try
            {
                Console.WriteLine( " отправил кандидата к " + targetUserId);
                var userId = Convert.ToString(targetUserId);
                await Clients.User(userId).SendAsync("ReceiveIceCandidate", candidate);
            }
            catch (Exception ex)
            {
                // Логируем ошибку
                Console.WriteLine($"Error sending ICE candidate: {ex.Message}");
                throw; // Перебрасываем исключение, чтобы клиент получил сообщение об ошибке
            }
        }

        public async Task HangUpCall(int targetUserId)
        {
            Console.WriteLine("Тот самый  отправил завершение к " + targetUserId);
            var userId = Convert.ToString(targetUserId);
            await Clients.User(userId).SendAsync("HangUpCall");
        }

    }

}
