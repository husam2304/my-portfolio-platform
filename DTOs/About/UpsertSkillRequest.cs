namespace Portfolio.API.DTOs.About;

public record UpsertSkillRequest(
    string Category, string Title, string Description,
    string Icon, List<string> Tags, int SortOrder = 0);
