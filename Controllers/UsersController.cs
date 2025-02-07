using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using AhuenniyChat.Data;
using AhuenniyChat.Models;
using AhuenniyChat.Helpers;

namespace AhuenniyChat
{
    public class UsersController : Controller
    {
        private readonly AhuenniyChatContext _context;

        public UsersController(AhuenniyChatContext context)
        {
            _context = context;
        }

        // GET: Users
        public async Task<IActionResult> Index()
        {
            // Получаем список всех пользователей
            var users = await _context.User.ToListAsync();

            // Получаем имя текущего пользователя
            var currentUserName = User.Identity?.Name;

            // Находим текущего пользователя в базе данных
            var currentUser = await _context.User
                .FirstOrDefaultAsync(u => u.UserName == currentUserName);

            // Передаем данные в представление
            ViewBag.CurrentUser = currentUser;
            ViewBag.CurrentUserName = currentUserName;


            return View(users);
        }



        // GET: Users/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.User == null)
            {
                return NotFound();
            }

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // GET: Users/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Users/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserName,Email,PasswordHash,Role")] User user)
        {
            if (ModelState.IsValid)
            {
                user.PasswordHash = Hash.HashPassword(user.PasswordHash);
                _context.Add(user);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(user);
        }

        // GET: Users/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.User == null)
            {
                return NotFound();
            }

            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return View(user);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserName,Role")] User user)
        {
            if (id != user.Id)
            {
                return NotFound();
            }

            // Получаем текущего пользователя из базы данных
            var existingUser = await _context.User.FirstOrDefaultAsync(m => m.Id == id);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Обновляем только UserName и Role
            existingUser.UserName = user.UserName;
            existingUser.Role = user.Role;

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(existingUser);
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    Console.WriteLine($"Concurrency error: {ex.Message}");
                    if (!UserExists(user.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            else
            {
                // Логируем ошибки валидации
                foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
                {
                    Console.WriteLine(error.ErrorMessage);
                }
            }
            return View(user);
        }

        // GET: Users/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.User == null)
            {
                return NotFound();
            }

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // POST: Users/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.User == null)
            {
                return Problem("Entity set 'AhuenniyChatContext.User'  is null.");
            }
            var user = await _context.User.FindAsync(id);
            if (user != null)
            {
                _context.User.Remove(user);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserExists(int id)
        {
          return (_context.User?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
