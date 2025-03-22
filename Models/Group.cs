namespace AhuenniyChat.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<User> Users { get; set; } = new List<User>();
        public bool? InCall { get; set; }
        public ICollection<Call> Calls { get; set; } = new List<Call>();
    }

}
