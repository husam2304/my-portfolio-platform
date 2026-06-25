namespace Portfolio.API.DTOs.About;

public record SkillDto(
    int Id, string Category, string Title,
    string Description, List<string> Tags, string Icon);
