using Microsoft.EntityFrameworkCore;
using Portfolio.API.Models;

namespace Portfolio.API.Data;

/// <summary>
/// Run once on first startup to create the admin account.
/// Call: dotnet run --seed
/// </summary>
public static class DbSeeder
{
    public static async Task SeedAdminAsync(AppDbContext db, string username, string password)
    {
        if (await db.Admins.AnyAsync(a => a.Username == username))
        {
            Console.WriteLine($"[Seeder] Admin '{username}' already exists. Skipping.");
            return;
        }

        var admin = new Admin
        {
            Username = username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            CreatedAt = DateTime.UtcNow
        };

        db.Admins.Add(admin);
        await db.SaveChangesAsync();
        Console.WriteLine($"[Seeder] Admin '{username}' created successfully.");
    }
}
