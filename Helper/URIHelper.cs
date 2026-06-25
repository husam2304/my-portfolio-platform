namespace Portfolio.API.Helper
{
    public static class UriHelper
    {
        public static string? GetAbsoluteUrl(
            HttpRequest request,
            string? relativePath)
        {
            if (string.IsNullOrWhiteSpace(relativePath))
                return null;

            // الرابط مخزن مسبقاً كرابط كامل
            if (Uri.TryCreate(relativePath, UriKind.Absolute, out _))
                return relativePath;

            var normalizedPath = relativePath.StartsWith("/")
                ? relativePath
                : $"/{relativePath}";

            return $"{request.Scheme}://{request.Host}{request.PathBase}{normalizedPath}";
        }
    }
}