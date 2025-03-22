using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AhuenniyChat.Data;
using System.Linq;
using System.Threading.Tasks;
using AhuenniyChat.Models;
using AhuenniyChat.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace AhuenniyChat.Controllers
{
    [ApiController]
    [Route("Group")]
    public class GroupController : Controller
    {
        private readonly AhuenniyChatContext _context;
        private readonly IHubContext<ChatHub> _hubContext;

        public GroupController(AhuenniyChatContext context, IHubContext<ChatHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpPost("CreateGroup")]
        public async Task<IActionResult> CreateGroup([FromBody] CreateGroupRequest request)
        {
            if (string.IsNullOrEmpty(request.GroupName))
            {
                return BadRequest(new { message = "Group name cannot be empty." });
            }

            var user = await _context.User.FindAsync(request.UserId);
            if (user == null)
            {
                return BadRequest(new { message = "User not found." });
            }

            var group = new Group { Name = request.GroupName, InCall = false };
            _context.Group.Add(group);
            group.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Группа успешно создана." });
        }

        public class CreateGroupRequest
        {
            public string GroupName { get; set; }
            public int UserId { get; set; }
        }


        public class AddToGroup
        {
            public int groupId { get; set; }
            public int userId { get; set; }
        }

        [HttpPost("AddUserToGroup")]
        public async Task<IActionResult> AddUserToGroup([FromBody] AddToGroup request)
        {
            Console.WriteLine(request.groupId + " группа и юзер " + request.userId);

            var group = await _context.Group
                .Include(g => g.Users)
                .FirstOrDefaultAsync(g => g.Id == request.groupId);

            var user = await _context.User.FindAsync(request.userId);
            Console.WriteLine(group + " группа и юзер " + user);
            if (group == null || user == null)
            {
                return NotFound("Group or user not found.");
            }

            if (group.Users.Contains(user))
            {
                return BadRequest("User  is already in the group.");
            }

            group.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Юзер добавлен." });
        }

        [HttpPost("RemoveUserFromGroup")]
        public async Task<IActionResult> RemoveUserFromGroup(int groupId, int userId)
        {
            var group = await _context.Group
                .Include(g => g.Users)
                .FirstOrDefaultAsync(g => g.Id == groupId);

            var user = await _context.User.FindAsync(userId);

            if (group == null || user == null)
            {
                return NotFound("Group or user not found.");
            }

            if (!group.Users.Contains(user))
            {
                return BadRequest("User is not in the group.");
            }

            group.Users.Remove(user);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index", "Home"); // или другой метод для отображения групп
        }


        [HttpGet("GetUsers/{groupId}")]
        public async Task<IActionResult> GetUsers(int groupId)
        {
            var group = await _context.Group
                .Include(g => g.Users)
                .FirstOrDefaultAsync(g => g.Id == groupId);

            if (group == null)
            {
                return NotFound($"Group with ID {groupId} not found.");
            }

            // Проекция на анонимный объект или DTO
            var userList = group.Users.Select(user => new
            {
                user.Id,
                user.UserName // или другие свойства, которые вам нужны
            }).ToList();

            return Ok(userList);
        }




        [HttpGet("GetStatus/{groupId}")]
        public async Task<IActionResult> GetStatus(int groupId)
        {
            var group = await _context.Group
                .FirstOrDefaultAsync(g => g.Id == groupId);

            if (group == null)
            {
                return NotFound($"Group with ID {groupId} not found.");
            }

            return Ok(group.InCall);
        }

        public class Status
        {
            public int groupId { get; set; }
            public bool inCall { get; set; }
        }

        [HttpPut("SetStatus")]
        public async Task<IActionResult> SetStatus([FromBody] Status status)
        {
            if (status == null)
            {
                return BadRequest("Invalid status data.");
            }

            var group = await _context.Group
                .FirstOrDefaultAsync(g => g.Id == status.groupId);

            if (group == null)
            {
                return NotFound($"Group with ID {status.groupId} not found.");
            }

            // Обновляем статус InCall
            group.InCall = status.inCall;

            // Сохраняем изменения в базе данных
            _context.Group.Update(group);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Статус изменен успешно." });
        }






        [HttpGet("GetMessages/{groupId}")]
        public async Task<IActionResult> GetMessages(int groupId)
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
            Console.WriteLine($"Current User ID: {currentUserId}, Group ID: {groupId}");

            try
            {
                // Получаем сообщения для группы
                var messages = await _context.Message
                    .Where(m => m.GroupId == groupId) // Фильтруем по группе
                    .OrderBy(m => m.Timestamp)
                    .Select(m => new
                    {
                        Id = m.Id,
                        Text = m.Text,
                        Timestamp = m.Timestamp.ToShortTimeString(),
                        SenderId = m.SenderId,
                        GroupId = m.GroupId,
                        IsCurrentUserSender = m.SenderId == currentUserId
                    })
                    .ToListAsync();

                // Отладочный вывод: количество сообщений
                Console.WriteLine($"Messages Count: {messages.Count}");

                if (messages.Count == 0)
                {
                    Console.WriteLine("No messages found for the specified group.");
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
            public int GroupId { get; set; }
            public string Text { get; set; }
        }



        [HttpPost("SendMessage")]
        public async Task<IActionResult> SendMessage([FromBody] MessageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data.");
            }

            var groupId = request.GroupId;
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


                var group = await _context.Group.FirstOrDefaultAsync(g => g.Id == groupId);
                if (group == null)
                {
                    return NotFound("Group not found.");
                }


                var message = new Message
                {
                    SenderId = currentUser.Id,
                    GroupId = groupId,
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





    }
}



