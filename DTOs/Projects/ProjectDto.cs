namespace Portfolio.API.DTOs.Projects;

// ── Projects ─────────────────────────────────────────────────
public record ProjectDto(
    string Id, string Title, string Description,
    string ImageUrl, List<string> Tags, bool isFeatured, bool NeedsTranslation=false );
