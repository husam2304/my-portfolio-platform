using Portfolio.API.Enum;
using Portfolio.API.Interfaces;

namespace Portfolio.API.Services;

public class FileService(IWebHostEnvironment env) : IFileService
{
    private static readonly string[] AllowedImageTypes =
    {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/svg+xml"
    };

    private static readonly string[] AllowedVideoTypes =
    {
        "video/mp4",
        "video/webm",
        "video/ogg"
    };

    private static readonly string[] AllowedImageExtensions =
    {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif",
        ".svg"
    };

    private static readonly string[] AllowedVideoExtensions =
    {
        ".mp4",
        ".webm",
        ".ogg"
    };

    public async Task<(string Url, EMediaType MediaType)> SaveMediaAsync(IFormFile file)
    {
        var contentType = file.ContentType.ToLowerInvariant();

        if (AllowedVideoTypes.Contains(contentType))
        {
            var url = await SaveVideoAsync(file);
            return (url, EMediaType.Video);
        }

        if (AllowedImageTypes.Contains(contentType))
        {
            var url = await SaveImageAsync(file);
            return (url, EMediaType.Image);
        }

        throw new InvalidOperationException("Unsupported media type.");
    }

    public async Task<string> SaveVideoAsync(IFormFile file, string subfolder = "videos")
    {
        var contentType = file.ContentType.ToLowerInvariant();
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!AllowedVideoTypes.Contains(contentType))
            throw new InvalidOperationException("Only MP4, WebM, and OGG videos are allowed.");

        if (!AllowedVideoExtensions.Contains(extension))
            throw new InvalidOperationException("Invalid video file extension.");

        if (file.Length > 100 * 1024 * 1024)
            throw new InvalidOperationException("Video must be smaller than 100MB.");

        var uploadsDir = Path.Combine(env.WebRootPath, "uploads", subfolder);
        Directory.CreateDirectory(uploadsDir);

        var fileName = $"{Guid.NewGuid()}{extension}";
        var fullPath = Path.Combine(uploadsDir, fileName);

        await using var stream = new FileStream(fullPath, FileMode.Create);
        await file.CopyToAsync(stream);

        return $"/uploads/{subfolder}/{fileName}";
    }

    public async Task<string> SaveImageAsync(IFormFile file, string subfolder = "images")
    {
        var contentType = file.ContentType.ToLowerInvariant();
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!AllowedImageTypes.Contains(contentType))
            throw new InvalidOperationException("Only JPEG, PNG, WebP, GIF, and SVG images are allowed.");

        if (!AllowedImageExtensions.Contains(extension))
            throw new InvalidOperationException("Invalid image file extension.");

        if (file.Length > 10 * 1024 * 1024)
            throw new InvalidOperationException("Image must be smaller than 10MB.");

        var uploadsDir = Path.Combine(env.WebRootPath, "uploads", subfolder);
        Directory.CreateDirectory(uploadsDir);

        var fileName = $"{Guid.NewGuid()}{extension}";
        var fullPath = Path.Combine(uploadsDir, fileName);

        await using var stream = new FileStream(fullPath, FileMode.Create);
        await file.CopyToAsync(stream);

        return $"/uploads/{subfolder}/{fileName}";
    }

    public async Task<string> SaveResumeAsync(IFormFile file)
    {
        var contentType = file.ContentType.ToLowerInvariant();
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (contentType != "application/pdf")
            throw new InvalidOperationException("Only PDF files are allowed.");

        if (extension != ".pdf")
            throw new InvalidOperationException("Invalid file extension.");

        if (file.Length > 20 * 1024 * 1024)
            throw new InvalidOperationException("Resume must be smaller than 20MB.");

        var uploadsDir = Path.Combine(env.WebRootPath, "uploads", "resume");
        Directory.CreateDirectory(uploadsDir);

        var fileName = "resume.pdf";
        var fullPath = Path.Combine(uploadsDir, fileName);

        await using var stream = new FileStream(fullPath, FileMode.Create);
        await file.CopyToAsync(stream);

        return $"/uploads/resume/{fileName}";
    }

    public void DeleteFile(string relativePath)
    {
        if (string.IsNullOrWhiteSpace(relativePath))
            return;

        var fullPath = Path.Combine(
            env.WebRootPath,
            relativePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar)
        );

        if (File.Exists(fullPath))
            File.Delete(fullPath);
    }
}