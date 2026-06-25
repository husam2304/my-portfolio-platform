namespace Portfolio.API.DTOs;

// ── Generic wrapper ───────────────────────────────────────────
public record ApiResult<T>(bool Succeeded, T? Data, string? Error);

public static class ApiResult
{
    public static ApiResult<T> Ok<T>(T data) => new(true, data, null);
    public static ApiResult<T> Fail<T>(string error) => new(false, default, error);
}