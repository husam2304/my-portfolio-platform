namespace Portfolio.API.DTOs.Resume;

public record UpsertExperienceItemRequest(
    string Title, string Company, string EmploymentType,
    string Period, string Description, bool IsCurrent,
    List<string> Achievements, List<string> Tags, int SortOrder = 0);
