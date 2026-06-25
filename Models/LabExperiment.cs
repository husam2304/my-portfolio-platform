namespace Portfolio.API.Models;

// ── Lab Experiments ──────────────────────────────────────────
public class LabExperiment
{
    public int Id { get; set; }
    public string ExperimentId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int CpuUsage { get; set; }
    public int NetworkUsage { get; set; }
}
