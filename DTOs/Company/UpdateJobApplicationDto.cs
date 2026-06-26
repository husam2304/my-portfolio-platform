using Portfolio.API.Enum;

namespace Portfolio.API.DTOs
{
    public class UpdateJobApplicationDto
    {
        public string JobTitle { get; set; } = string.Empty;
        public DateTime? AppliedAt { get; set; }
        public EApplicationStatus Status { get; set; }
        public string? Notes { get; set; }
    }
}
