namespace AhuenniyChat.Models
{
    public class Call
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime StartAt { get; set; }
        public DateTime? EndAt { get; set; }
        public int? GroupId { get; set; } // Внешний ключ для Group
        public ICollection<User> Users { get; set; } = new List<User>();
        public Group? Group { get; set; } // Навигационное свойство для Group
    }
}
