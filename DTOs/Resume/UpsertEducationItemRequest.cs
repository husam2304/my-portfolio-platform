namespace Portfolio.API.DTOs.Resume;

public record UpsertEducationItemRequest(string Degree, string Institution, string Period, string? Focus, int SortOrder = 0);
