using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.DTOs;
using Portfolio.API.DTOs.Projects;
using Portfolio.API.Helper;
using Portfolio.API.Interfaces;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(AppDbContext db, IFileService fileService) : ControllerBase
{
    // ── Public ───────────────────────────────────────────────

    /// <summary>Get all projects for the resolved language.</summary>
    [HttpGet("get-projects")]
    public async Task<IActionResult> GetProjects()
    {
        var lang = LanguageHelper.GetLang(Request); // ar | en
        var otherLang = lang == "ar" ? "en" : "ar";

        var projects = await db.Projects
            .AsNoTracking()
            .Include(p => p.Tags)
            .Include(p => p.ProjectLocalises)
            .OrderBy(p => p.SortOrder)
            .ToListAsync();

        return Ok(ApiResult.Ok(projects.Select(p => MapToDto(p, Request)).ToList()));
    }

    /// <summary>Get featured projects for the resolved language.</summary>
    [HttpGet("get-featured-projects")]
    public async Task<IActionResult> GetFeaturedProjects()
    {
        var lang = LanguageHelper.GetLang(Request);
        var projects = await db.Projects
            .Include(p => p.Tags)
            .Include(p => p.ProjectLocalises)
            .Where(p => p.IsFeatured)
            .OrderBy(p => p.SortOrder)
            .ToListAsync();

        return Ok(ApiResult.Ok(projects.Select(p => MapToDto(p, Request)).ToList()));
    }

    /// <summary>
    /// Get project detail by GroupId — always use GroupId (not the raw row Id)
    /// so the client uses the same identifier regardless of language.
    /// </summary>
    [HttpGet("get-project-by-id/{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var lang = LanguageHelper.GetLang(Request);
        var p = await db.Projects
    .Include(p => p.Tags)
    .Include(p => p.ArchitectureElements)
    .Include(p => p.CodeHighlights)
    .Include(p => p.ProjectLocalises)
    .Include(p => p.ProjectMedia)
    .FirstOrDefaultAsync(p => p.Id == id);

        if (p is null) return NotFound(ApiResult.Fail<ProjectDetailDto>("Project not found."));
        return Ok(ApiResult.Ok(MapToDetailDto(p, Request)));
    }

    // ── Admin ────────────────────────────────────────────────

    /// <summary>
    /// [Admin] Create a project row.
    /// — No ?groupId  → creates the EN row; GroupId is set to its own Id after insert.
    /// — ?groupId=N   → creates the AR row linked to the EN row with that GroupId.
    ///   Neutral fields (ImageUrl, IsFeatured, SortOrder, Meta, CodeSnippet) are
    ///   copied from the EN row automatically; only localised fields come from the body.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromForm] UpsertProjectRequest request,
        IFormFile? image)
    {
        var lang = LanguageHelper.GetLang(Request);
        var imageUrl = string.Empty;


        if (image is not null)
            imageUrl = await fileService.SaveImageAsync(image, "projects");

        var mediaTasks = (request.ProjectMedia ?? [])
    .Select(async media =>
    {
        var (url, type) = await fileService.SaveMediaAsync(media);

        return new ProjectMedia
        {
            MediaUri = url,
            Type = type
        };
    });

        var projectMedia = (await Task.WhenAll(mediaTasks)).ToList();

        var project = new Project
        {
            ProjectLocalises = new List<ProjectLocalise>
    {
        new ProjectLocalise
        {
            Lang = lang,
            Title = request.Title,
            Description = request.Description,
            CaseStudyLabel = request.CaseStudyLabel,
            OverviewTitle = request.OverviewTitle,
            OverviewDescription = request.OverviewDescription
        }
    },

            ImageUrl = imageUrl,
            IsFeatured = request.IsFeatured ?? false,
            SortOrder = request.SortOrder ?? 0,
            MetaClient = request.MetaClient,
            MetaTechStack = request.MetaTechStack,
            MetaTimeline = request.MetaTimeline,
            CodeSnippet = request.CodeSnippet,
            AppLink=request.AppLink,
            WebsiteLink=request.WebsiteLink,
            GithubLink= request.GithubLink,
            Tags = request.Tags
                .Select(t => new ProjectTag { Tag = t })
                .ToList(),

            ArchitectureElements = (request.ArchitectureElements ?? [])
                .Select(e => new ProjectArchitectureElement
                {
                    Name = e.Name,
                    Label = e.Label,
                    Description = e.Description,
                    Icon = e.Icon,
                    SortOrder = e.SortOrder
                })
                .ToList(),

            CodeHighlights = (request.CodeHighlights ?? [])
                .Select(h => new ProjectCodeHighlight
                {
                    Title = h.Title,
                    Description = h.Description,
                    Icon = h.Icon,
                    SortOrder = h.SortOrder
                })
                .ToList(),

            ProjectMedia = projectMedia
        };
        db.Projects.Add(project);
        
        await db.SaveChangesAsync();

        return Ok(ApiResult.Ok(MapToDto(project, Request)));
    }

    /// <summary>
    /// [Admin] Update a project row identified by GroupId + lang from header.
    /// Neutral fields (ImageUrl, IsFeatured, SortOrder, Meta, CodeSnippet) are
    /// automatically synced to all sibling rows in the same group.
    /// Children (Tags, ArchitectureElements, CodeHighlights) are updated only on
    /// the EN row — AR row shares them via the EN row's Id.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        [FromForm] UpsertProjectRequest request,
        IFormFile? image)
    {
        var lang = LanguageHelper.GetLang(Request);

        var project = await db.Projects
    .Include(p => p.ProjectLocalises)
    .Include(p => p.Tags)
    .Include(p => p.ArchitectureElements)
    .Include(p => p.CodeHighlights)
    .Include(p => p.ProjectMedia)
    .FirstOrDefaultAsync(p => p.Id == id);

        if (project is null)
            return NotFound(ApiResult.Fail<ProjectDto>("Project not found."));

        var localisation = project.ProjectLocalises
            .FirstOrDefault(pl => pl.Lang == lang);

        if (localisation is null)
        {
            localisation = new ProjectLocalise
            {
                Lang = lang,
                ProjectId = project.Id,
                Title = request.Title,
                Description = request.Description,
                CaseStudyLabel = request.CaseStudyLabel,
                OverviewDescription = request.OverviewDescription,
                OverviewTitle = request.OverviewTitle


            };

            project.ProjectLocalises.Add(localisation);
            await db.SaveChangesAsync();

            return Ok(ApiResult.Ok(MapToDto(project, Request)));
        }

        var newImageUrl = project.ImageUrl;

        if (image is not null)
        {
            if (!string.IsNullOrEmpty(project.ImageUrl))
                fileService.DeleteFile(project.ImageUrl);

            newImageUrl = await fileService.SaveImageAsync(image, "projects");
        }

        // Localized fields
        localisation.Title = request.Title;
        localisation.Description = request.Description;
        localisation.CaseStudyLabel = request.CaseStudyLabel;
        localisation.OverviewTitle = request.OverviewTitle;
        localisation.OverviewDescription = request.OverviewDescription;

        // Neutral fields
        project.ImageUrl = newImageUrl;
        if (request.IsFeatured.HasValue)
            project.IsFeatured = request.IsFeatured.Value;
        if (request.SortOrder.HasValue)
            project.SortOrder = request.SortOrder.Value;
        project.MetaClient = request.MetaClient;
        project.MetaTechStack = request.MetaTechStack;
        project.MetaTimeline = request.MetaTimeline;
        project.CodeSnippet = request.CodeSnippet;

        project.AppLink = request.AppLink;
        project.WebsiteLink = request.WebsiteLink;
         project.GithubLink = request.GithubLink;

        if (request.Tags?.Count > 0)
            project.Tags = request.Tags.Select(t => new ProjectTag { Tag = t }).ToList();
        if (request.ArchitectureElements?.Count > 0)
            project.ArchitectureElements = (request.ArchitectureElements ?? []).Select(e =>
                new ProjectArchitectureElement
                {
                    Name = e.Name,
                    Label = e.Label,
                    Description = e.Description,
                    Icon = e.Icon,
                    SortOrder = e.SortOrder
                }).ToList();
        if (request.CodeHighlights?.Count > 0)
            project.CodeHighlights = (request.CodeHighlights ?? []).Select(h =>
                new ProjectCodeHighlight
                {
                    Title = h.Title,
                    Description = h.Description,
                    Icon = h.Icon,
                    SortOrder = h.SortOrder
                }).ToList();


        if (request.ProjectMedia?.Count > 0)
        {
            foreach (var media in project.ProjectMedia)
            {
                fileService.DeleteFile(media.MediaUri);
            }

            project.ProjectMedia.Clear();

            var mediaTasks = request.ProjectMedia.Select(async media =>
            {
                var (url, type) = await fileService.SaveMediaAsync(media);

                return new ProjectMedia
                {
                    MediaUri = url,
                    Type = type
                };
            });

            project.ProjectMedia = (await Task.WhenAll(mediaTasks)).ToList();
        }

        await db.SaveChangesAsync();

        return Ok(ApiResult.Ok(MapToDto(project, Request)));
    }

    /// <summary>
    /// [Admin] Delete by GroupId.
    /// Default → deletes only the current lang row.
    /// ?allLangs=true → deletes all rows in the group (both en + ar).
    /// </summary>
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {

        var project = await db.Projects
    .Include(p => p.ProjectMedia)
    .FirstOrDefaultAsync(p => p.Id == id);
        if (project is null)
            return NotFound(ApiResult.Fail<object>("Project not found for this language."));
        if (!string.IsNullOrEmpty(project.ImageUrl))
        {
            fileService.DeleteFile(project.ImageUrl);
        }

        foreach (var media in project.ProjectMedia)
        {
            fileService.DeleteFile(media.MediaUri);
        }
        db.Projects.Remove(project);

        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok<object>(new { deleted = true }));
    }

    // ── Mappers ──────────────────────────────────────────────

    private static ProjectDto MapToDto(Project p, HttpRequest request)
    {

        var lang = LanguageHelper.GetLang(request);

        var localisation = p.ProjectLocalises
            .FirstOrDefault(pl => pl.Lang == lang);

        return new(
            p.Id.ToString(),
            localisation?.Title ?? (lang == LanguageHelper.En ? "need to translate" : "بحاجة للترجمة"),
            localisation?.Description ?? (lang == LanguageHelper.En ? "need to translate" : "بحاجة للترجمة"),
            URIHelper.GetAbsoluteUrl(request, p.ImageUrl),
            p.Tags.Select(t => t.Tag).ToList(),
            p.IsFeatured,
            localisation == null
        );
    }

    private static ProjectDetailDto MapToDetailDto(Project p, HttpRequest request)
    {
        var lang = LanguageHelper.GetLang(request);

        var localisation = p.ProjectLocalises
            .FirstOrDefault(pl => pl.Lang == lang);
        return new(
    p.Id.ToString(),
    localisation?.CaseStudyLabel ?? string.Empty,
    localisation?.Title ?? "",
    localisation?.Description ?? "",
    URIHelper.GetAbsoluteUrl(request, p.ImageUrl),

    p.ProjectMedia.Select(m => new ProjectMediaDto(
        URIHelper.GetAbsoluteUrl(request, m.MediaUri),
        m.Type))
    .ToList(),
        new ProjectMetaDto(p.MetaClient ?? "", p.MetaTechStack ?? "", p.MetaTimeline ?? ""),
        localisation?.OverviewTitle ?? string.Empty,
        localisation?.OverviewDescription ?? string.Empty,
        p.ArchitectureElements.OrderBy(e => e.SortOrder)
            .Select(e => new ArchitectureElementDto(e.Name, e.Label, e.Description, e.Icon,e.SortOrder)).ToList(),
        p.CodeHighlights.OrderBy(h => h.SortOrder)
            .Select(h => new CodeHighlightDto(h.Id.ToString(), h.Title, h.Description, h.Icon,h.SortOrder)).ToList(),
        p.CodeSnippet ?? string.Empty,
        p.SortOrder,
        p.Tags.Select(e=> e.Tag).ToList(),
        p.IsFeatured,
        p.GithubLink,
        p.WebsiteLink,
        p.AppLink
        );
    }
}
