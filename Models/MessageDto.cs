namespace AhuenniyChat.Models
{
    public class MessageDto
    {
        // Идентификатор получателя сообщения
        public int ReceiverId { get; set; }

        // Имя отправителя сообщения
        public string SenderName { get; set; }

        // Текст сообщения
        public string Message { get; set; }

        // Время отправки сообщения (опционально)
        public DateTime Timestamp { get; set; } = DateTime.Today;
    }

}
