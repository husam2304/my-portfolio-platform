using Microsoft.AspNetCore.Mvc.Formatters;

namespace Portfolio.API.Models;

public class Project
{
    public int Id { get; set; }
    // Lang-neutral (kept in sync across group)
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public int SortOrder { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? MetaClient { get; set; }
    public string? MetaTechStack { get; set; }
    public string? MetaTimeline { get; set; }
    public string? CodeSnippet { get; set; }
    public string? WebsiteLink { get; set; }
    public string? AppLink { get; set; }
    public string? GithubLink { get; set; }




    // Children shared across both langs

    public ICollection<ProjectMedia> ProjectMedia { get; set; } = [];
    public ICollection<ProjectLocalise> ProjectLocalises { get; set; } = [];

    public ICollection<ProjectTag> Tags { get; set; } = [];
    public ICollection<ProjectArchitectureElement> ArchitectureElements { get; set; } = [];
    public ICollection<ProjectCodeHighlight> CodeHighlights { get; set; } = [];
}
