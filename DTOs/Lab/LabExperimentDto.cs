namespace Portfolio.API.DTOs.Lab;

// ── Lab Experiments ──────────────────────────────────────────
public record LabExperimentDto(
    string Id, string Title, string Description,
    int CpuUsage, int NetworkUsage);
