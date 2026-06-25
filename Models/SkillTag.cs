namespace Portfolio.API.Models;

public class SkillTag
{
    public int Id { get; set; }
    public int SkillId { get; set; }
    public Skill Skill { get; set; } = null!;
    public string Tag { get; set; } = string.Empty;
}
