using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;
using AhuenniyChat.Hubs;
using System.Security.Claims;
using AhuenniyChat.Data;
using AhuenniyChat.Models;

namespace AhuenniyChat.Controllers
{
    [ApiController]
    [Route("Call")]
    public class CallController : Controller
    {
        private readonly AhuenniyChatContext _context;

        public CallController(AhuenniyChatContext context)
        {
            _context = context;
        }

        [HttpGet("GetCalls")]
        public async Task<ActionResult<IEnumerable<Call>>> GetCalls()
        {
            return await _context.Call
                .Include(c => c.Group) // Включаем связанную группу
                .Include(c => c.Users) // Включаем связанных пользователей
                .ToListAsync();
        }


        [HttpGet("GetCall/{id}")]
        public async Task<ActionResult<Call>> GetCall(int userId)
        {
            // Fetch the ID of the active call where the user is a participant
            var id = await _context.Call
                .Where(c => c.Users.Any(u => u.Id == userId) && c.Status == "Active")
                .Select(c => c.Id)
                .FirstOrDefaultAsync();

            if (id == 0) // If no active call is found
            {
                return NotFound("No active call found for the user.");
            }

            var call = await _context.Call
                .Include(c => c.Group) // Включаем связанную группу
                .Include(c => c.Users) // Включаем связанных пользователей
                .FirstOrDefaultAsync(c => c.Id == id);

            if (call == null)
            {
                return NotFound();
            }

            return call;
        }



        [HttpPost("CreateCall")]
        public async Task<IActionResult> CreateCall([FromBody] CreateCallRequest request)
        {
            try
            {
                // Validate the request
                if (request == null)
                {
                    return BadRequest(new { message = "Request data is required." });
                }

                // Find the user
                var user = await _context.User.FindAsync(request.UserId);
                if (user == null)
                {
                    return BadRequest(new { message = "User not found." });
                }

                // Create the call
                var call = new Call
                {
                    Status = "active",
                    StartAt = DateTime.Now,
                    Users = new List<User>() // Initialize the Users collection
                };

                Console.WriteLine(request.GroupId);

                if (request.GroupId != null)
                {
                    var group = await _context.Group.FindAsync(request.GroupId.Value);
                    if (group == null)
                    {
                        return BadRequest(new { message = "Group not found." });
                    }
                    call.GroupId = request.GroupId.Value;
                    call.Group = group;
                }

                // Add the user to the call
                call.Users.Add(user);

                // Save the call to the database
                _context.Call.Add(call);
                await _context.SaveChangesAsync();

                // Return success response
                return Ok(new { message = "Call created successfully.", callId = call.Id });
            }
            catch (Exception ex)
            {
                // Log the full exception details
                Console.Error.WriteLine($"Error creating call: {ex}");
                return StatusCode(500, new { message = "An error occurred while creating the call.", details = ex.ToString() });
            }
        }



        public class CreateCallRequest
        {
            public int? GroupId { get; set; }
            public int UserId { get; set; }
        }



        [HttpPut("PutCall/{id}")]
        public async Task<IActionResult> PutCall(int id, Call call)
        {
            if (id != call.Id)
            {
                return BadRequest();
            }

            _context.Entry(call).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CallExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Calls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCall(int id)
        {
            var call = await _context.Call.FindAsync(id);
            if (call == null)
            {
                return NotFound();
            }

            _context.Call.Remove(call);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CallExists(int id)
        {
            return _context.Call.Any(e => e.Id == id);
        }


        public class AddToCall
        {
            public int callId { get; set; }
            public int userId { get; set; }
        }

        [HttpPost("AddUserToCall")]
        public async Task<IActionResult> AddUserToCall([FromBody] AddToCall request)
        {
            Console.WriteLine(request.callId + " звонок и юзер " + request.userId);

            var user = await _context.User.FindAsync(request.userId);

            var call = await _context.Call
                .Include(g => g.Users)
                .FirstOrDefaultAsync(g => g.Id == request.callId);

            
            Console.WriteLine(call + " call и юзер " + user);
            if (call == null || user == null)
            {
                return NotFound("Call or user not found.");
            }

            if (call.Users.Contains(user))
            {
                return BadRequest("User  is already in the call.");
            }

            call.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Юзер добавлен." });
        }


        public class RemoveFromCall
        {
            public int callId { get; set; }
            public int userId { get; set; }
        }


        [HttpPost("RemoveUserFromCall")]
        public async Task<IActionResult> RemoveUserFromCall([FromBody] RemoveFromCall request)
        {
            // Validate input
            if (request.callId <= 0 || request.userId <= 0)
            {
                return BadRequest("Invalid call ID or user ID.");
            }

            // Fetch the call with its associated users
            var call = await _context.Call
                .Include(c => c.Users)
                .FirstOrDefaultAsync(c => c.Id == request.callId);

            if (call == null)
            {
                return NotFound("Call not found.");
            }

            // Fetch the user
            var user = await _context.User.FindAsync(request.userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Check if the user is in the call
            if (!call.Users.Any(u => u.Id == request.userId))
            {
                return BadRequest("User is not in the call.");
            }

            // Remove the user from the call
            call.Users.Remove(user);

            // If no users are left, set the call status to "Inactive"
            if (call.Users.Count == 0)
            {
                call.Status = "inactive";
                call.EndAt = DateTime.Now;
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return success response
            return Ok(new { message = "User removed from call.", callStatus = call.Status });
        }



        [HttpGet("GetUnfinishedCalls")]
        public async Task<IActionResult> GetUnfinishedCalls([FromQuery] int userId)
        {
            try
            {
                var unfinishedCalls = await _context.Call
                    .Where(c => c.Status == "active" && c.Users.Any(u => u.Id == userId))
                    .ToListAsync();


                return Ok(unfinishedCalls);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching unfinished calls." });
            }
        }

        [HttpGet("GetActiveGroupCalls")]
        public async Task<IActionResult> GetActiveGroupCalls(int groupId)
        {
            // Проверка на валидность groupId
            if (groupId <= 0)
            {
                return BadRequest("Invalid group ID.");
            }

            // Получение активных звонков для группы
            var activeCalls = await _context.Call
                .Where(c => c.GroupId == groupId && c.Status == "active")
                .ToListAsync();

            return Ok(activeCalls);
        }



        public class UserDto
        {
            public int Id { get; set; }
            public string UserName { get; set; }
        }

        [HttpGet("members")]
        public async Task<IEnumerable<UserDto>> GetCallMembers(int groupId)
        {
            try
            {
                // Ищем активный звонок по идентификатору группы
                var activeCallUsers = await _context.Call
                    .Include(c => c.Users) // Включаем связанных пользователей
                    .FirstOrDefaultAsync(c => c.GroupId == groupId && c.Status == "active");

                if (activeCallUsers != null)
                {
                    // Преобразуем пользователей в DTO
                    var userDtos = activeCallUsers.Users.Select(u => new UserDto
                    {
                        Id = u.Id,
                        UserName = u.UserName
                    });

                    return userDtos;
                }

                // Если активный звонок не найден, возвращаем пустой список
                return new List<UserDto>();
            }
            catch (Exception ex)
            {
                // Логируем ошибку
                throw; // Или верните пустой список с логированием
            }
        }


        public class CallDto
        {
            public int Id { get; set; }
            public List<UserDto> Users { get; set; }
            // Другие необходимые поля
        }


        [HttpGet("call")]
        public async Task<IActionResult> GetCallOfGroup(int groupId)
        {
            try
            {
                var activeCall = await _context.Call
                    .Include(c => c.Users)
                    .FirstOrDefaultAsync(c => c.GroupId == groupId && c.Status == "active");

                if (activeCall != null)
                {
                    var callDto = new CallDto
                    {
                        Id = activeCall.Id,
                        Users = activeCall.Users.Select(u => new UserDto
                        {
                            Id = u.Id,
                            UserName = u.UserName
                        }).ToList()
                    };
                    return Ok(callDto);
                }

                return Ok(null);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ошибка сервера: " + ex.Message);
            }
        }


    }
}

