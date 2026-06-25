namespace Portfolio.API.Models;

public class ExperienceItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string EmploymentType { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsCurrent { get; set; }
    public int SortOrder { get; set; }
    public ICollection<ExperienceAchievement> Achievements { get; set; } = [];
    public ICollection<ExperienceTag> Tags { get; set; } = [];
}
