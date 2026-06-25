using Portfolio.API.DTOs;
using Portfolio.API.DTOs.Auth;

namespace Portfolio.API.Interfaces
{
    public interface IAuthService
    {
        Task<ApiResult<LoginResponse>> LoginAsync(LoginRequest request);
    }
}
