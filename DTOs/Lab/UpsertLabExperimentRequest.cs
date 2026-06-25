namespace Portfolio.API.DTOs.Lab;

public record UpsertLabExperimentRequest(
    string ExperimentId, string Title, string Description,
    int CpuUsage, int NetworkUsage);
