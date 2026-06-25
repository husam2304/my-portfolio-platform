using Microsoft.AspNetCore.Mvc;
using Portfolio.API.DTOs;
using Portfolio.API.DTOs.Auth;
using Portfolio.API.Interfaces;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    /// <summary>Admin login — returns JWT token</summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await authService.LoginAsync(request);
        return result.Succeeded ? Ok(result) : Unauthorized(result);
    }
}
