using AhuenniyChat.Data;
using AhuenniyChat.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace AhuenniyChat.Controllers
{
    public class HomeController : Controller
    {
        private readonly AhuenniyChatContext _context;

        public HomeController(AhuenniyChatContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var currentUserName = User.Identity?.Name;

            var currentUser = await _context.User
                .FirstOrDefaultAsync(u => u.UserName == currentUserName);

            var usersWithMessages = await _context.Message
                .Where(m => m.SenderId == currentUser.Id || m.ReceiverId == currentUser.Id)
                .Select(m => m.SenderId == currentUser.Id ? m.Recipient : m.Sender)
                .Distinct()
                .ToListAsync();

            ViewBag.UsersWithMessages = usersWithMessages;

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetMessages(int userId)
        {
            var currentUserName = User.Identity?.Name;

            var currentUser = await _context.User
                .FirstOrDefaultAsync(u => u.UserName == currentUserName);

            var messages = await _context.Message
                .Where(m => (m.SenderId == currentUser.Id && m.ReceiverId == userId) || (m.SenderId == userId && m.ReceiverId == currentUser.Id))
                .Select(m => new
                {
                    senderName = m.Sender.UserName, // Assuming you have a Name property in your User model
                    text = m.Text
                })
                .OrderBy(m => m.text) //Order by timestamp if you have it in your model.
                .ToListAsync();

            return Json(messages);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}