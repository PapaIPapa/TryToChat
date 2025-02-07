using AhuenniyChat.Data;
using AhuenniyChat.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AhuenniyChat.Helpers;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace AhuenniyChat.Controllers
{
    [AllowAnonymous]
    public class AuthController : Controller
    {
        private readonly AhuenniyChatContext _context;

        public AuthController(AhuenniyChatContext context)
        {
            _context = context;
        }

        // GET: Account/Register
        public IActionResult Register()
        {
            // Проверяем, аутентифицирован ли пользователь
            if (User.Identity.IsAuthenticated)
            {
                // Если пользователь аутентифицирован, перенаправляем на главную страницу
                return RedirectToAction("Index", "Home");
            }

            // Если пользователь не аутентифицирован, показываем страницу входа
            return View();
        }

        // POST: Account/Register
        [HttpPost]
        public async Task<IActionResult> Register(User model)
        {
            if (ModelState.IsValid)
            {
                // Проверка, существует ли пользователь с таким именем или email
                var existingUser = await _context.User
                    .FirstOrDefaultAsync(u => u.UserName == model.UserName || u.Email == model.Email);

                if (existingUser != null)
                {
                    ModelState.AddModelError("", "Пользователь с таким именем или email уже существует.");
                    return View(model);
                }

                // Хэширование пароля
                model.PasswordHash = Hash.HashPassword(model.PasswordHash);

                // Добавление пользователя в базу данных
                _context.User.Add(model);
                await _context.SaveChangesAsync();

                return RedirectToAction("Login");
            }

            return View(model);
        }
        // GET: Account/Login
        public IActionResult Login()
        {
            // Проверяем, аутентифицирован ли пользователь
            if (User.Identity.IsAuthenticated)
            {
                // Если пользователь аутентифицирован, перенаправляем на главную страницу
                return RedirectToAction("Index", "Home");
            }

            // Если пользователь не аутентифицирован, показываем страницу входа
            return View();
        }


        // POST: Account/Login
        [HttpPost]
        public async Task<IActionResult> Login(string username, string password, bool rememberMe)
        {
            if (!User.Identity.IsAuthenticated)
            {
                var user = await _context.User.FirstOrDefaultAsync(u => u.UserName == username);

                if (user != null && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                {

                    var claims = new List<Claim>
                    {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim("UserId", user.Id.ToString())
                    };

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var authProperties = new AuthenticationProperties
                    {
                        IsPersistent = rememberMe,
                        ExpiresUtc = DateTimeOffset.UtcNow.AddDays(3)
                    };


                    await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsIdentity),
                        authProperties);

                    return RedirectToAction("Index", "Home");
                }

                ModelState.AddModelError("", "Неверное имя пользователя или пароль.");
                return View();
            }
            return View();
        }

        // GET: Account/Logout
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            // Завершение сеанса пользователя
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            // Перенаправление на главную страницу или страницу входа
            return RedirectToAction("Index", "Home");
        }

    }
}
