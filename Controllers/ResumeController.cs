using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.DTOs;
using Portfolio.API.DTOs.Resume;
using Portfolio.API.Interfaces;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController(AppDbContext db, IFileService fileService, IWebHostEnvironment env) : ControllerBase
{
    // ── Tech Stack ───────────────────────────────────────────

    [HttpGet("get-tech-stack")]
    public async Task<IActionResult> GetTechStack()
    {
        var items = await db.TechStackItems
            .OrderBy(i => i.SortOrder)
            .Select(i => new TechStackItemDto(i.Category, i.Value))
            .ToListAsync();
        return Ok(ApiResult.Ok(new TechStackDataDto(items)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("tech-stack")]
    public async Task<IActionResult> CreateTechStack([FromBody] UpsertTechStackItemRequest request)
    {
        var item = new TechStackItem { Category = request.Category, Value = request.Value, SortOrder = request.SortOrder };
        db.TechStackItems.Add(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new TechStackItemDto(item.Category, item.Value)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("tech-stack/{id:int}")]
    public async Task<IActionResult> UpdateTechStack(int id, [FromBody] UpsertTechStackItemRequest request)
    {
        var item = await db.TechStackItems.FindAsync(id);
        if (item is null) return NotFound(ApiResult.Fail<TechStackItemDto>("Item not found."));
        item.Category = request.Category; item.Value = request.Value; item.SortOrder = request.SortOrder;
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new TechStackItemDto(item.Category, item.Value)));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("tech-stack/{id:int}")]
    public async Task<IActionResult> DeleteTechStack(int id)
    {
        var item = await db.TechStackItems.FindAsync(id);
        if (item is null) return NotFound(ApiResult.Fail<object>("Item not found."));
        db.TechStackItems.Remove(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok<object>(new { deleted = true }));
    }

    // ── Certifications ───────────────────────────────────────

    [HttpGet("get-certifications")]
    public async Task<IActionResult> GetCertifications()
    {
        var items = await db.Certifications
            .OrderBy(c => c.SortOrder)
            .Select(c => new CertificationDto(c.Title, c.Level, c.Year))
            .ToListAsync();
        return Ok(ApiResult.Ok(new CertificationsDataDto(items)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("certifications")]
    public async Task<IActionResult> CreateCertification([FromBody] UpsertCertificationRequest request)
    {
        var item = new Certification { Title = request.Title, Level = request.Level, Year = request.Year, SortOrder = request.SortOrder };
        db.Certifications.Add(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new CertificationDto(item.Title, item.Level, item.Year)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("certifications/{id:int}")]
    public async Task<IActionResult> UpdateCertification(int id, [FromBody] UpsertCertificationRequest request)
    {
        var item = await db.Certifications.FindAsync(id);
        if (item is null) return NotFound(ApiResult.Fail<CertificationDto>("Certification not found."));
        item.Title = request.Title; item.Level = request.Level; item.Year = request.Year; item.SortOrder = request.SortOrder;
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new CertificationDto(item.Title, item.Level, item.Year)));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("certifications/{id:int}")]
    public async Task<IActionResult> DeleteCertification(int id)
    {
        var item = await db.Certifications.FindAsync(id);
        if (item is null) return NotFound(ApiResult.Fail<object>("Certification not found."));
        db.Certifications.Remove(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok<object>(new { deleted = true }));
    }

    // ── Education ────────────────────────────────────────────

    [HttpGet("get-education")]
    public async Task<IActionResult> GetEducation()
    {
        var items = await db.EducationItems
            .OrderBy(e => e.SortOrder)
            .Select(e => new EducationItemDto(e.Degree, e.Institution, e.Period, e.Focus))
            .ToListAsync();
        return Ok(ApiResult.Ok(new EducationDataDto(items)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("education")]
    public async Task<IActionResult> CreateEducation([FromBody] UpsertEducationItemRequest request)
    {
        var item = new EducationItem { Degree = request.Degree, Institution = request.Institution, Period = request.Period, Focus = request.Focus, SortOrder = request.SortOrder };
        db.EducationItems.Add(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new EducationItemDto(item.Degree, item.Institution, item.Period, item.Focus)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("education/{id:int}")]
    public async Task<IActionResult> UpdateEducation(int id, [FromBody] UpsertEducationItemRequest request)
    {
        var item = await db.EducationItems.FindAsync(id);
        if (item is null) return NotFound(ApiResult.Fail<EducationItemDto>("Education item not found."));
        item.Degree = request.Degree; item.Institution = request.Institution;
        item.Period = request.Period; item.Focus = request.Focus; item.SortOrder = request.SortOrder;
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new EducationItemDto(item.Degree, item.Institution, item.Period, item.Focus)));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("education/{id:int}")]
    public async Task<IActionResult> DeleteEducation(int id)
    {
        var item = await db.EducationItems.FindAsync(id);
        if (item is null) return NotFound(ApiResult.Fail<object>("Education item not found."));
        db.EducationItems.Remove(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok<object>(new { deleted = true }));
    }

    // ── Experience ───────────────────────────────────────────

    [HttpGet("get-experience")]
    public async Task<IActionResult> GetExperience()
    {
        var items = await db.ExperienceItems
            .Include(e => e.Achievements)
            .Include(e => e.Tags)
            .OrderBy(e => e.SortOrder)
            .ToListAsync();

        var dtos = items.Select(e => new ExperienceItemDto(
            e.Id.ToString(), e.Title, e.Company, e.EmploymentType, e.Period, e.Description,
            e.Achievements.OrderBy(a => a.SortOrder).Select(a => a.Text).ToList(),
            e.Tags.Select(t => t.Tag).ToList(), e.IsCurrent)).ToList();

        return Ok(ApiResult.Ok(new ExperienceDataDto(dtos)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("experience")]
    public async Task<IActionResult> CreateExperience([FromBody] UpsertExperienceItemRequest request)
    {
        var item = new ExperienceItem
        {
            Title = request.Title,
            Company = request.Company,
            EmploymentType = request.EmploymentType,
            Period = request.Period,
            Description = request.Description,
            IsCurrent = request.IsCurrent,
            SortOrder = request.SortOrder,
            Achievements = request.Achievements.Select((a, i) => new ExperienceAchievement { Text = a, SortOrder = i }).ToList(),
            Tags = request.Tags.Select(t => new ExperienceTag { Tag = t }).ToList()
        };
        db.ExperienceItems.Add(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(MapExperienceToDto(item)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("experience/{id:int}")]
    public async Task<IActionResult> UpdateExperience(int id, [FromBody] UpsertExperienceItemRequest request)
    {
        var item = await db.ExperienceItems.Include(e => e.Achievements).Include(e => e.Tags).FirstOrDefaultAsync(e => e.Id == id);
        if (item is null) return NotFound(ApiResult.Fail<ExperienceItemDto>("Experience item not found."));

        item.Title = request.Title; item.Company = request.Company;
        item.EmploymentType = request.EmploymentType; item.Period = request.Period;
        item.Description = request.Description; item.IsCurrent = request.IsCurrent; item.SortOrder = request.SortOrder;

        db.ExperienceAchievements.RemoveRange(item.Achievements);
        db.ExperienceTags.RemoveRange(item.Tags);
        item.Achievements = request.Achievements.Select((a, i) => new ExperienceAchievement { Text = a, SortOrder = i }).ToList();
        item.Tags = request.Tags.Select(t => new ExperienceTag { Tag = t }).ToList();

        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(MapExperienceToDto(item)));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("experience/{id:int}")]
    public async Task<IActionResult> DeleteExperience(int id)
    {
        var item = await db.ExperienceItems.FindAsync(id);
        if (item is null) return NotFound(ApiResult.Fail<object>("Experience item not found."));
        db.ExperienceItems.Remove(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok<object>(new { deleted = true }));
    }

    // ── Publications ─────────────────────────────────────────

    [HttpGet("get-publications")]
    public async Task<IActionResult> GetPublications()
    {
        var items = await db.Publications
            .OrderBy(p => p.SortOrder)
            .Select(p => new PublicationDto(p.Id.ToString(), p.Title, p.Description, p.Source, p.Date, p.Icon))
            .ToListAsync();
        return Ok(ApiResult.Ok(new PublicationsDataDto(items)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("publications")]
    public async Task<IActionResult> CreatePublication([FromBody] UpsertPublicationRequest request)
    {
        var item = new Publication { Title = request.Title, Description = request.Description, Source = request.Source, Date = request.Date, Icon = request.Icon, SortOrder = request.SortOrder };
        db.Publications.Add(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new PublicationDto(item.Id.ToString(), item.Title, item.Description, item.Source, item.Date, item.Icon)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("publications/{id:int}")]
    public async Task<IActionResult> UpdatePublication(int id, [FromBody] UpsertPublicationRequest request)
    {
        var item = await db.Publications.FindAsync(id);
        if (item is null) return NotFound(ApiResult.Fail<PublicationDto>("Publication not found."));
        item.Title = request.Title; item.Description = request.Description;
        item.Source = request.Source; item.Date = request.Date;
        item.Icon = request.Icon; item.SortOrder = request.SortOrder;
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new PublicationDto(item.Id.ToString(), item.Title, item.Description, item.Source, item.Date, item.Icon)));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("publications/{id:int}")]
    public async Task<IActionResult> DeletePublication(int id)
    {
        var item = await db.Publications.FindAsync(id);
        if (item is null) return NotFound(ApiResult.Fail<object>("Publication not found."));
        db.Publications.Remove(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok<object>(new { deleted = true }));
    }

    // ── Resume PDF ───────────────────────────────────────────

    /// <summary>[Admin] Upload resume PDF</summary>
    [Authorize(Roles = "Admin")]
    [HttpPost("upload")]
    public async Task<IActionResult> UploadResume(IFormFile file)
    {
        var path = await fileService.SaveResumeAsync(file);
        var record = await db.ResumeFiles.FirstOrDefaultAsync() ?? new ResumeFile();
        var isNew = record.Id == 0;
        record.FileName = file.FileName;
        record.FilePath = path;
        record.UploadedAt = DateTime.UtcNow;
        if (isNew) db.ResumeFiles.Add(record);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new { path }));
    }

    /// <summary>Download the latest resume PDF</summary>
    [HttpGet("download")]
    public async Task<IActionResult> Download()
    {
        var record = await db.ResumeFiles.FirstOrDefaultAsync();
        if (record is null) return NotFound(ApiResult.Fail<object>("Resume not available."));

        var fullPath = Path.Combine(env.WebRootPath, record.FilePath.TrimStart('/'));
        if (!System.IO.File.Exists(fullPath))
            return NotFound(ApiResult.Fail<object>("Resume file not found on disk."));

        var bytes = await System.IO.File.ReadAllBytesAsync(fullPath);
        return File(bytes, "application/pdf", "resume.pdf");
    }

    // ── Helpers ──────────────────────────────────────────────

    private static ExperienceItemDto MapExperienceToDto(ExperienceItem e) => new(
        e.Id.ToString(), e.Title, e.Company, e.EmploymentType, e.Period, e.Description,
        e.Achievements.OrderBy(a => a.SortOrder).Select(a => a.Text).ToList(),
        e.Tags.Select(t => t.Tag).ToList(), e.IsCurrent);
}
