using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace AhuenniyChat.Hubs
{
    public class CallHub : Hub
    {
        public async Task SendSignal(string to, string signal)
        {
            // Проверяем, существует ли клиент с указанным идентификатором
            if (Clients.Client(to) != null)
            {
                // Отправляем сигнал только если клиент существует
                await Clients.Client(to).SendAsync("ReceiveSignal", Context.ConnectionId, signal);
            }
            else
            {
                // Логируем или обрабатываем случай, когда клиент не найден
                // Например, можно отправить сообщение об ошибке вызывающему клиенту
                await Clients.Caller.SendAsync("Error", "Recipient not found");
            }
        }
    }
}
