namespace Portfolio.API.DTOs.Resume;

public record UpsertPublicationRequest(string Title, string Description, string Source, string Date, string Icon, int SortOrder = 0);
