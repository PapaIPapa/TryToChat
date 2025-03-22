namespace AhuenniyChat.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; }

        public ICollection<Group>? Groups { get; set; } = new List<Group>();
        public ICollection<Call>? Calls { get; set; } = new List<Call>(); // Связь с Call
    }

}

