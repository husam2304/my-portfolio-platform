using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.DTOs;
using Portfolio.API.DTOs.Home;
using Portfolio.API.Helper;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController(AppDbContext db) : ControllerBase
{
    /// <summary>
    /// GET hero — language resolved from Accept-Language header (en | ar, default en).
    /// </summary>
    [HttpGet("hero")]
    public async Task<IActionResult> GetHero()
    {
        var lang = LanguageHelper.GetLang(Request);
        var hero = await db.HeroSections.FirstOrDefaultAsync(h => h.Lang == lang);
        if (hero is null)
            return NotFound(ApiResult.Fail<HeroSectionDto>("Hero section not configured."));

        return Ok(ApiResult.Ok(new HeroSectionDto(hero.Title, hero.Description)));
    }

    /// <summary>
    /// [Admin] Upsert hero for the language in Accept-Language header.
    /// Pass ?groupId=N when creating the AR row so it links to the EN row.
    /// GroupId is ignored on update (row already exists).
    /// </summary>
    [Authorize(Roles = "Admin")]
    [HttpPut("hero")]
    public async Task<IActionResult> UpsertHero(
        [FromBody] UpsertHeroRequest request,
        [FromQuery] int? groupId = null)
    {
        var lang = LanguageHelper.GetLang(Request);
        var hero = await db.HeroSections.FirstOrDefaultAsync(h => h.Lang == lang);
        var isNew = hero is null;
        hero ??= new HeroSection { Lang = lang };

        hero.Title = request.Title;
        hero.Description = request.Description;

        if (isNew)
        {
            db.HeroSections.Add(hero);
            await db.SaveChangesAsync();
            // GroupId = provided groupId (ar row) OR own Id (en row)
            hero.GroupId = groupId ?? hero.Id;
        }

        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new HeroSectionDto(hero.Title, hero.Description)));
    }
}
