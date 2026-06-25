namespace Portfolio.API.DTOs.Projects;

public record UpsertCodeHighlightRequest(string Title, string Description, string Icon, int SortOrder = 0);
