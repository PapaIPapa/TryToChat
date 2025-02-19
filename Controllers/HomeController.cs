using AhuenniyChat.Data;
using AhuenniyChat.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;
using AhuenniyChat.Hubs;
using System.Security.Claims;

namespace AhuenniyChat.Controllers
{
    [ApiController]
    [Route("Home")]
    public class HomeController : Controller
    {
        private readonly AhuenniyChatContext _context;
        private readonly IHubContext<ChatHub> _hubContext;

        public HomeController(AhuenniyChatContext context, IHubContext<ChatHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpGet("")]
        public async Task<IActionResult> Index()
        {

            // Проверяем, аутентифицирован ли пользователь
            if (!User.Identity.IsAuthenticated)
            {
                // Если пользователь аутентифицирован, перенаправляем на главную страницу
                return RedirectToAction("Register", "Auth");
            }

            var currentUserName = User.Identity?.Name;
            var currentUser = await _context.User.FirstOrDefaultAsync(u => u.UserName == currentUserName);

            // Получаем объекты пользователей, с которыми есть общие сообщения
            var usersWithMessages = await _context.Message
                .Where(m => m.SenderId == currentUser.Id || m.ReceiverId == currentUser.Id) // Фильтруем сообщения
                .Select(m => m.SenderId == currentUser.Id ? m.ReceiverId : m.SenderId) // Выбираем ID пользователя
                .Distinct() // Убираем дубликаты
                .Join(_context.User, // Присоединяем таблицу пользователей
                    messageUserId => messageUserId, // ID из сообщений
                    user => user.Id, // ID пользователя
                    (messageUserId, user) => user)
                .Select(user => new User 
                {
                    Id = user.Id,
                    UserName = user.UserName == currentUserName ? "Saved Messages" : user.UserName,
                })
                .ToListAsync();

            // Получаем список групп, в которых состоит пользователь
            var groupsWithUser = await _context.Group
                .Where(g => g.Users.Any(u => u.Id == currentUser.Id)) // Фильтруем группы, где есть текущий пользователь
                .Select(g => new Group
                {
                    Id = g.Id,
                    Name = g.Name,
                })
                .ToListAsync();

            // Передаем данные в представление
            ViewBag.GroupsWithUser = groupsWithUser;
            ViewBag.UsersWithMessages = usersWithMessages;
            ViewBag.Users = await _context.User.ToListAsync();

            return View();
        }

        [HttpGet("SearchUsers")]
        public async Task<IActionResult> SearchUsers(string term)
        {
            var users = await _context.User
                .Where(u => u.UserName.Contains(term))
                .Select(u => new { u.Id, u.UserName })
                .Take(5) // Ограничиваем количество результатов
                .ToListAsync();

            return Json(users);
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
            var currentUserName = User.Identity?.Name;
            var currentUser = await _context.User.FirstOrDefaultAsync(u => u.UserName == currentUserName);

            return Json(currentUser);
        }


        [HttpGet("GetUserName/{userId}")]
        public async Task<IActionResult> GetUserName(int userId)
        {
            var user = await _context.User.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Json(new { userName = user.UserName }); // Возвращаем имя пользователя
        }



        [HttpGet("GetMessages/{userId}")]
        public async Task<IActionResult> GetMessages(int userId)
        {
            // Получаем текущего пользователя
            var currentUserName = User.Identity?.Name;
            var currentUser = await _context.User.FirstOrDefaultAsync(u => u.UserName == currentUserName);

            if (currentUser == null)
            {
                return Unauthorized("Пользователь не авторизован.");
            }

            var currentUserId = currentUser.Id;

            // Отладочный вывод: проверка идентификаторов
            Console.WriteLine($"Current User ID: {currentUserId}, Target User ID: {userId}");

            try
            {
                // Получаем сообщения, соответствующие модели Message
                var messages = await _context.Message
                    .Where(m => (m.SenderId == currentUserId && m.ReceiverId == userId) ||
                                (m.SenderId == userId && m.ReceiverId == currentUserId))
                    .OrderBy(m => m.Timestamp)
                    .Select(m => new
                    {
                        Id = m.Id,
                        Text = m.Text,
                        Timestamp = m.Timestamp.ToShortTimeString(),
                        SenderId = m.SenderId,
                        ReceiverId = m.ReceiverId,
                        IsCurrentUserSender = m.SenderId == currentUserId
                    })
                    .ToListAsync();

                // Отладочный вывод: количество сообщений
                Console.WriteLine($"Messages Count: {messages.Count}");

                if (messages.Count == 0)
                {
                    Console.WriteLine("No messages found for the specified users.");
                }

                return Json(messages);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}"); // Отладочный вывод
                return StatusCode(500, "Произошла ошибка при обработке запроса.");
            }
        }



        public class MessageRequest
        {
            public int ReceiverId { get; set; }
            public string Text { get; set; }
        }

        [HttpPost("SendMessage")]
        public async Task<IActionResult> SendMessage([FromBody] MessageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data.");
            }

            var receiverId = request.ReceiverId;
            var text = request.Text;

            try
            {
                var currentUserName = User.Identity?.Name;
                if (string.IsNullOrEmpty(currentUserName))
                {
                    return Unauthorized("User is not authenticated.");
                }

                if (string.IsNullOrWhiteSpace(text))
                {
                    return BadRequest("Message text cannot be empty.");
                }

                var currentUser = await _context.User.FirstOrDefaultAsync(u => u.UserName == currentUserName);
                if (currentUser == null)
                {
                    return NotFound("Current user not found.");
                }

                var receiver = await _context.User.FirstOrDefaultAsync(u => u.Id == receiverId);
                if (receiver == null)
                {
                    return NotFound("Receiver not found.");
                }

                var message = new Message
                {
                    SenderId = currentUser.Id,
                    ReceiverId = receiverId,
                    Text = text,
                    Timestamp = DateTime.Now
                };

                _context.Message.Add(message);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Message sent successfully." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ошибка при отправке сообщения: {ex.Message}");
                return StatusCode(500, new { success = false, message = "Internal server error." });
            }
        }






        [HttpGet("privacy")]
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [HttpGet("error")]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}