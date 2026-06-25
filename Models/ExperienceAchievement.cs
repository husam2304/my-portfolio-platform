namespace Portfolio.API.Models;

public class ExperienceAchievement
{
    public int Id { get; set; }
    public int ExperienceItemId { get; set; }
    public ExperienceItem ExperienceItem { get; set; } = null!;
    public string Text { get; set; } = string.Empty;
    public int SortOrder { get; set; }
}
