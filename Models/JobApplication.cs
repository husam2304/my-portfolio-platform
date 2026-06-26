using Portfolio.API.Enum;

namespace Portfolio.API.Models;

public class JobApplication
{
    public int Id { get; set; }
    public int CompanyId { get; set; }
    public string JobTitle { get; set; } = string.Empty;
    public DateTime? AppliedAt { get; set; }
    public EApplicationStatus Status { get; set; } = EApplicationStatus.Pending;
    public string? CvFileName { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Company Company { get; set; } = null!;
}
