namespace Portfolio.API.Models;

public class ProjectLocalise
{
    public int id { get; set; }

    public int ProjectId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? CaseStudyLabel { get; set; }
    public string? OverviewTitle { get; set; }
    public string? OverviewDescription { get; set; }

    public string Lang { get; set; } = "en";

    public Project Project { get; set; }


}
