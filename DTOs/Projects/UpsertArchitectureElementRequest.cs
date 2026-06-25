namespace Portfolio.API.DTOs.Projects;

public record UpsertArchitectureElementRequest(string Name, string Label, string Description, string Icon, int SortOrder = 0);

