namespace Portfolio.API.Models;

public class ExperienceTag
{
    public int Id { get; set; }
    public int ExperienceItemId { get; set; }
    public ExperienceItem ExperienceItem { get; set; } = null!;
    public string Tag { get; set; } = string.Empty;
}
