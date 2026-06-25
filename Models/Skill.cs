namespace Portfolio.API.Models;

public class Skill
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public string DescriptionAr { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public int SortOrder { get; set; }

    public ICollection<SkillTag> Tags { get; set; } = [];
}
