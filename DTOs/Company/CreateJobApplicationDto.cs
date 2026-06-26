using Portfolio.API.Enum;

namespace Portfolio.API.DTOs
{
    public class CreateJobApplicationDto
    {
        public int CompanyId { get; set; }
        public string JobTitle { get; set; } = string.Empty;
        public DateTime? AppliedAt { get; set; }
        public EApplicationStatus Status { get; set; } = EApplicationStatus.Pending;
        public string? Notes { get; set; }
        // CV file handled separately via IFormFile
    }
}
