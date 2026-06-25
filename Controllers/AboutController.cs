using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.DTOs;
using Portfolio.API.DTOs.About;
using Portfolio.API.Helper;
using Portfolio.API.Interfaces;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AboutController(AppDbContext db, IFileService fileService) : ControllerBase
{
    // ── Philosophy ───────────────────────────────────────────

    /// <summary>Get philosophy for the resolved language.</summary>
    [HttpGet("get-philosophy")]
    public async Task<IActionResult> GetPhilosophy()
    {
        var lang = LanguageHelper.GetLang(Request);
        var p = await db.Philosophies.FirstOrDefaultAsync(x => x.Lang == lang);
        if (p is null)
            return NotFound(ApiResult.Fail<PhilosophyDto>("Philosophy not configured."));

        return Ok(ApiResult.Ok(new PhilosophyDto(
            p.Label, p.Title, p.Description,
            URIHelper.GetAbsoluteUrl(Request, p.ImageUrl))));
    }

    /// <summary>
    /// [Admin] Upsert philosophy for the language in Accept-Language header.
    /// Pass ?groupId=N when creating the AR row.
    /// ImageUrl is lang-neutral — synced to sibling row automatically.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [HttpPut("philosophy")]
    public async Task<IActionResult> UpsertPhilosophy(
        [FromForm] UpsertPhilosophyRequest request,
        IFormFile? image,
        [FromQuery] int? groupId = null)
    {
        var lang = LanguageHelper.GetLang(Request);
        var p = await db.Philosophies.FirstOrDefaultAsync(x => x.Lang == lang);
        var isNew = p is null;
        p ??= new Philosophy { Lang = lang };

        var newImageUrl = p.ImageUrl;
        if (image is not null)
        {
            if (!string.IsNullOrEmpty(p.ImageUrl)) fileService.DeleteFile(p.ImageUrl);
            newImageUrl = await fileService.SaveImageAsync(image, "about");
        }
        else if (!string.IsNullOrEmpty(request.ImageUrl))
        {
            newImageUrl = request.ImageUrl;
        }

        p.ImageUrl = newImageUrl;
        p.Label = request.Label;
        p.Title = request.Title;
        p.Description = request.Description;

        if (isNew)
        {
            db.Philosophies.Add(p);
            await db.SaveChangesAsync();
            p.GroupId = groupId ?? p.Id;
        }

        // Sync ImageUrl to sibling rows
        if (!string.IsNullOrEmpty(newImageUrl))
        {
            var siblings = await db.Philosophies
                .Where(x => x.GroupId == p.GroupId && x.Lang != lang)
                .ToListAsync();
            foreach (var s in siblings) s.ImageUrl = newImageUrl;
        }

        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new PhilosophyDto(
            p.Label, p.Title, p.Description,
            URIHelper.GetAbsoluteUrl(Request, p.ImageUrl))));
    }

    // ── Expertise / Skills (lang-neutral — unchanged) ────────

    [HttpGet("get-expertise")]
    public async Task<IActionResult> GetExpertise()
    {
        var lang = LanguageHelper.GetLang(Request);
        var skills = await db.Skills
            .Include(s => s.Tags)
            .OrderBy(s => s.SortOrder)
            .ToListAsync();

        return Ok(ApiResult.Ok(new ExpertiseDataDto(skills.Select(s => new SkillDto(
            s.Id,
            s.Category,
            s.Title, 
            (lang == LanguageHelper.En ? s.Description : s.DescriptionAr),
            s.Tags.Select(t => t.Tag).ToList(), s.Icon)).ToList())));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("skills")]
    public async Task<IActionResult> CreateSkill([FromBody] UpsertSkillRequest request)
    {

        var lang = LanguageHelper.GetLang(Request);

        var skill = new Skill
        {
            Category = request.Category, Title = request.Title,
            Description = lang == "en" ?request.Description : "" ,
            DescriptionAr = lang == "ar" ? request.Description:"",
            Icon = request.Icon,
            SortOrder = request.SortOrder,
            Tags = request.Tags.Select(t => new SkillTag { Tag = t }).ToList()
        };
        db.Skills.Add(skill);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new SkillDto(skill.Id, skill.Category, skill.Title,
            skill.Description, skill.Tags.Select(t => t.Tag).ToList(), skill.Icon)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("skills/{id:int}")]
    public async Task<IActionResult> UpdateSkill(int id, [FromBody] UpsertSkillRequest request)
    {
        var lang = LanguageHelper.GetLang(Request);

        var skill = await db.Skills.Include(s => s.Tags).FirstOrDefaultAsync(s => s.Id == id);
        if (skill is null) return NotFound(ApiResult.Fail<SkillDto>("Skill not found."));

        skill.Category = request.Category;
        skill.Title = request.Title;
        skill.Description = lang == "en"?request.Description:skill.Description;
        skill.DescriptionAr = lang == "ar"?request.Description:skill.DescriptionAr;
        skill.Icon = request.Icon;
        skill.SortOrder = request.SortOrder;
        db.SkillTags.RemoveRange(skill.Tags);
        skill.Tags = request.Tags.Select(t => new SkillTag { Tag = t }).ToList();

        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new SkillDto(skill.Id, skill.Category, skill.Title,
            skill.Description, skill.Tags.Select(t => t.Tag).ToList(), skill.Icon)));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("skills/{id:int}")]
    public async Task<IActionResult> DeleteSkill(int id)
    {
        var skill = await db.Skills.FindAsync(id);
        if (skill is null) return NotFound(ApiResult.Fail<object>("Skill not found."));
        db.Skills.Remove(skill);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok<object>(new { deleted = true }));
    }

    // ── Journey ──────────────────────────────────────────────

    /// <summary>Get journey items for the resolved language.</summary>
    [HttpGet("get-journey")]
    public async Task<IActionResult> GetJourney()
    {
        var lang = LanguageHelper.GetLang(Request);
        var items = await db.JourneyItems
            .Where(j => j.Lang == lang)
            .OrderBy(j => j.SortOrder)
            .Select(j => new JourneyItemDto(j.GroupId, j.Period, j.Position, j.Company, j.Highlighted))
            .ToListAsync();

        return Ok(ApiResult.Ok(new JourneyDataDto(items)));
    }

    /// <summary>
    /// [Admin] Create a journey item for the resolved language.
    /// Pass ?groupId=N to link an AR row to an existing EN row.
    /// Neutral fields (Period, SortOrder, Highlighted) are copied from EN row when groupId is provided.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [HttpPost("journey")]
    public async Task<IActionResult> CreateJourneyItem(
        [FromBody] UpsertJourneyItemRequest request,
        [FromQuery] int? groupId = null)
    {
        var lang = LanguageHelper.GetLang(Request);

        if (groupId.HasValue)
        {
            var enRow = await db.JourneyItems.FirstOrDefaultAsync(
                j => j.GroupId == groupId.Value && j.Lang == LanguageHelper.En);
            if (enRow is null)
                return NotFound(ApiResult.Fail<JourneyItemDto>(
                    $"No English journey item found with GroupId {groupId}."));

            var arItem = new JourneyItem
            {
                Lang = lang,
                GroupId = groupId.Value,
                // Localised
                Position = request.Position,
                Company = request.Company,
                // Neutral (copied from EN row)
                Period = enRow.Period,
                Highlighted = enRow.Highlighted,
                SortOrder = enRow.SortOrder
            };
            db.JourneyItems.Add(arItem);
            await db.SaveChangesAsync();
            return Ok(ApiResult.Ok(new JourneyItemDto(
                arItem.GroupId, arItem.Period, arItem.Position, arItem.Company, arItem.Highlighted)));
        }

        // EN row
        var item = new JourneyItem
        {
            Lang = lang,
            Period = request.Period,
            Position = request.Position,
            Company = request.Company,
            Highlighted = request.Highlighted,
            SortOrder = request.SortOrder
        };
        db.JourneyItems.Add(item);
        await db.SaveChangesAsync();
        item.GroupId = item.Id;
        await db.SaveChangesAsync();

        return Ok(ApiResult.Ok(new JourneyItemDto(
            item.GroupId, item.Period, item.Position, item.Company, item.Highlighted)));
    }

    /// <summary>
    /// [Admin] Update journey item by GroupId + lang from header.
    /// Neutral fields (Period, SortOrder, Highlighted) are synced to sibling rows.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [HttpPut("journey/{groupId:int}")]
    public async Task<IActionResult> UpdateJourneyItem(
        int groupId,
        [FromBody] UpsertJourneyItemRequest request)
    {
        var lang = LanguageHelper.GetLang(Request);
        var item = await db.JourneyItems
            .FirstOrDefaultAsync(j => j.GroupId == groupId && j.Lang == lang);
        if (item is null)
            return NotFound(ApiResult.Fail<JourneyItemDto>("Journey item not found for this language."));

        // Localised
        item.Position = request.Position;
        item.Company = request.Company;

        // Neutral
        item.Period = request.Period;
        item.Highlighted = request.Highlighted;
        item.SortOrder = request.SortOrder;

        // Sync neutral fields to siblings
        var siblings = await db.JourneyItems
            .Where(j => j.GroupId == groupId && j.Lang != lang)
            .ToListAsync();
        foreach (var s in siblings)
        {
            s.Period = request.Period;
            s.Highlighted = request.Highlighted;
            s.SortOrder = request.SortOrder;
        }

        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new JourneyItemDto(
            item.GroupId, item.Period, item.Position, item.Company, item.Highlighted)));
    }

    /// <summary>
    /// [Admin] Delete journey item by GroupId.
    /// Default → deletes only the current lang row.
    /// ?allLangs=true → deletes all rows in the group.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [HttpDelete("journey/{groupId:int}")]
    public async Task<IActionResult> DeleteJourneyItem(int groupId, [FromQuery] bool allLangs = false)
    {
        var lang = LanguageHelper.GetLang(Request);

        if (allLangs)
        {
            var all = await db.JourneyItems.Where(j => j.GroupId == groupId).ToListAsync();
            if (all.Count == 0)
                return NotFound(ApiResult.Fail<object>("Journey item not found."));
            db.JourneyItems.RemoveRange(all);
        }
        else
        {
            var item = await db.JourneyItems
                .FirstOrDefaultAsync(j => j.GroupId == groupId && j.Lang == lang);
            if (item is null)
                return NotFound(ApiResult.Fail<object>("Journey item not found for this language."));
            db.JourneyItems.Remove(item);
        }

        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok<object>(new { deleted = true }));
    }
}
