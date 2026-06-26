using Portfolio.API.Enum;

namespace Portfolio.API.DTOs
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Website { get; set; }
        public string? ContactPerson { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }

        // Computed
        public int TotalApplications { get; set; }
        public DateTime? LastAppliedAt { get; set; }
        public EApplicationStatus? LatestStatus { get; set; }
    }
}
