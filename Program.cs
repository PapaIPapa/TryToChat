using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AhuenniyChat.Data;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AhuenniyChatContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AhuenniyChatContext") ?? throw new InvalidOperationException("Connection string 'AhuenniyChatContext' not found.")));

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddRazorPages();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
        .AddCookie(options =>
        {
            options.LoginPath = "/Auth/Login";
            options.Cookie.Name = "UserAuthCookie";
            options.ExpireTimeSpan = TimeSpan.FromMinutes(1600);
            options.SlidingExpiration = true;
        });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();


app.MapRazorPages(); // Reordered
app.MapControllers(); // Reordered

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=Register}/{id?}");


app.Run();
