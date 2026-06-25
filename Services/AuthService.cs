using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Portfolio.API.Data;
using Portfolio.API.DTOs;
using Portfolio.API.DTOs.Auth;
using Portfolio.API.Interfaces;

namespace Portfolio.API.Services;



public class AuthService(AppDbContext db, IConfiguration config) : IAuthService
{
    public async Task<ApiResult<LoginResponse>> LoginAsync(LoginRequest request)
    {
        var admin = await db.Admins.FirstOrDefaultAsync(a => a.Username == request.Username);
        if (admin is null || !BCrypt.Net.BCrypt.Verify(request.Password, admin.PasswordHash))
            return ApiResult.Fail<LoginResponse>("Invalid username or password.");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Secret"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddHours(12);

        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: [new Claim(ClaimTypes.Name, admin.Username), new Claim(ClaimTypes.Role, "Admin")],
            expires: expires,
            signingCredentials: creds
        );

        return ApiResult.Ok(new LoginResponse(new JwtSecurityTokenHandler().WriteToken(token), expires));
    }
}
