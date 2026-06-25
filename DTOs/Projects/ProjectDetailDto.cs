using Portfolio.API.Enum;

namespace Portfolio.API.DTOs.Projects;

public record ProjectDetailDto(
    string Id,
    string CaseStudyLabel,
    string Title,
    string Description,
    string ImageUrl,
    List<ProjectMediaDto> Media,
    ProjectMetaDto Meta,
    string OverviewTitle,
    string OverviewDescription,
    List<ArchitectureElementDto> ArchitectureElements,
    List<CodeHighlightDto> CodeHighlights,
    string CodeSnippet,
    int SortOrder,
    List<string> Tags,
    bool IsFeatured,
    string? GithubLink,
    string? WebsiteLink,
    string? AppLink

   );


public record ProjectMediaDto(
    string Url,
    EMediaType Type
);