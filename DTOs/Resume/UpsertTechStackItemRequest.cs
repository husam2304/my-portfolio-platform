namespace Portfolio.API.DTOs.Resume;

public record UpsertTechStackItemRequest(string Category, string Value, int SortOrder = 0);
