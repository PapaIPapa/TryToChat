using System.Security.Cryptography;
using System.Text;
using BCrypt;

namespace AhuenniyChat.Helpers
{
    public class Hash
    {
        public static string HashPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
                throw new ArgumentNullException(nameof(password), "Пароль не может быть пустым.");

            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
