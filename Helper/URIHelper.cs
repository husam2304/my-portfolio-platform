using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;

namespace Portfolio.API.Helper;

public static class URIHelper
{
    public static string? GetAbsoluteUrl(HttpRequest request, string? path)
    {
        if (string.IsNullOrWhiteSpace(path))
            return null;

        if (Uri.TryCreate(path, UriKind.Absolute, out var uri) &&
            (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps))
        {
            return path;
        }

        var normalizedPath = path.StartsWith("/")
            ? path
            : $"/{path}";

        return UriHelper.BuildAbsolute(
            scheme: request.Scheme,
            host: request.Host,
            pathBase: request.PathBase,
            path: normalizedPath
        );
    }
}