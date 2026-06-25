namespace Portfolio.API.Models;

public class ProjectTag
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public string Tag { get; set; } = string.Empty;
}
