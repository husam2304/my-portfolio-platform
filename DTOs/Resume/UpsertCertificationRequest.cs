namespace Portfolio.API.DTOs.Resume;

public record UpsertCertificationRequest(string Title, string Level, int Year, int SortOrder = 0);
