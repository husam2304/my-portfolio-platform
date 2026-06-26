using Portfolio.API.Enum;

namespace Portfolio.API.DTOs
{
    public class JobApplicationDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public DateTime? AppliedAt { get; set; }
        public EApplicationStatus Status { get; set; }
        public string? CvFileName { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
