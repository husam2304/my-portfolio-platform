using Portfolio.API.Enum;

namespace Portfolio.API.Interfaces
{
    public interface IFileService
    {
        Task<(string Url, EMediaType MediaType)> SaveMediaAsync(IFormFile file);

        Task<string> SaveVideoAsync(IFormFile file, string subfolder = "videos");

        Task<string> SaveImageAsync(IFormFile file, string subfolder = "images");
        Task<string> SaveResumeAsync(IFormFile file);
        void DeleteFile(string relativePath);
    }
}
