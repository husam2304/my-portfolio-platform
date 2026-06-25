namespace Portfolio.API.DTOs.Projects;

public record UpsertProjectRequest(
    string Title,
    string Description,
    bool? IsFeatured,
    int? SortOrder,
    List<string>? Tags,
    string? CaseStudyLabel,
    string? MetaClient,
    string? MetaTechStack,
    string? MetaTimeline,
    string? OverviewTitle,
    string? OverviewDescription,
    string? CodeSnippet,
    List<IFormFile>? ProjectMedia,
    List<UpsertArchitectureElementRequest>? ArchitectureElements,
    List<UpsertCodeHighlightRequest>? CodeHighlights,
    string? WebsiteLink,
    string? AppLink,
    string? GithubLink);
