namespace Portfolio.API.DTOs.Resume;

public record ExperienceItemDto(
    string Id, string Title, string Company, string EmploymentType,
    string Period, string Description, List<string> Achievements,
    List<string> Tags, bool IsCurrent);
