using Azure.Messaging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.DTOs;
using Portfolio.API.DTOs.Contact;
using Portfolio.API.Interfaces;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController(AppDbContext db, IEmailService _emailService) : ControllerBase
{
    // ── Social Links ─────────────────────────────────────────
    

    [HttpGet("get-social-links")]
    public async Task<IActionResult> GetSocialLinks()
    {
        var links = await db.SocialLinks
            .OrderBy(l => l.SortOrder)
            .Select(l => new SocialLinkDto(l.Id.ToString(), l.Name, l.Handle, l.Url, l.Icon))
            .ToListAsync();
        return Ok(ApiResult.Ok(new SocialLinksDataDto(links)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("social-links")]
    public async Task<IActionResult> CreateSocialLink([FromBody] UpsertSocialLinkRequest request)
    {
        var link = new SocialLink { Name = request.Name, Handle = request.Handle, Url = request.Url, Icon = request.Icon, SortOrder = request.SortOrder };
        db.SocialLinks.Add(link);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new SocialLinkDto(link.Id.ToString(), link.Name, link.Handle, link.Url, link.Icon)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("social-links/{id:int}")]
    public async Task<IActionResult> UpdateSocialLink(int id, [FromBody] UpsertSocialLinkRequest request)
    {
        var link = await db.SocialLinks.FindAsync(id);
        if (link is null) return NotFound(ApiResult.Fail<SocialLinkDto>("Social link not found."));
        link.Name = request.Name; link.Handle = request.Handle;
        link.Url = request.Url; link.Icon = request.Icon; link.SortOrder = request.SortOrder;
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new SocialLinkDto(link.Id.ToString(), link.Name, link.Handle, link.Url, link.Icon)));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("social-links/{id:int}")]
    public async Task<IActionResult> DeleteSocialLink(int id)
    {
        var link = await db.SocialLinks.FindAsync(id);
        if (link is null) return NotFound(ApiResult.Fail<object>("Social link not found."));
        db.SocialLinks.Remove(link);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok<object>(new { deleted = true }));
    }

    // ── Contact Specs ─────────────────────────────────────────

    [HttpGet("get-specs")]
    public async Task<IActionResult> GetSpecs()
    {
        var specs = await db.ContactSpecs
            .OrderBy(s => s.SortOrder)
            .Select(s => new ContactSpecDto(s.Id,s.Label, s.Value))
            .ToListAsync();
        return Ok(ApiResult.Ok(new ContactSpecsDataDto(specs)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("specs")]
    public async Task<IActionResult> CreateSpec([FromBody] UpsertContactSpecRequest request)
    {
        var spec = new ContactSpec { Label = request.Label, Value = request.Value, SortOrder = request.SortOrder };
        db.ContactSpecs.Add(spec);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new ContactSpecDto(spec.Id, spec.Label, spec.Value)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("specs/{id:int}")]
    public async Task<IActionResult> UpdateSpec(int id, [FromBody] UpsertContactSpecRequest request)
    {
        var spec = await db.ContactSpecs.FindAsync(id);
        if (spec is null) return NotFound(ApiResult.Fail<ContactSpecDto>("Spec not found."));
        spec.Label = request.Label; spec.Value = request.Value; spec.SortOrder = request.SortOrder;
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new ContactSpecDto(spec.Id, spec.Label, spec.Value)));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("specs/{id:int}")]
    public async Task<IActionResult> DeleteSpec(int id)
    {
        var spec = await db.ContactSpecs.FindAsync(id);
        if (spec is null) return NotFound(ApiResult.Fail<object>("Spec not found."));
        db.ContactSpecs.Remove(spec);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok<object>(new { deleted = true }));
    }

    // ── Submit Form ──────────────────────────────────────────

    /// <summary>Submit contact form — extend with email sending here</summary>
    [HttpPost("submit-contact-form")]
    public async Task<IActionResult> SubmitForm(
        [FromBody] ContactFormRequest request)
    {
        var contactMessage = new ContactMessage
        {
            Name = request.Name,
            Email = request.Email,
            Subject = request.Subject,
            Message = request.Message,
            CreatedAt = DateTime.UtcNow
        };

        db.ContactMessages.Add(contactMessage);

        await db.SaveChangesAsync();

        return Ok(
            ApiResult.Ok(
                new ContactFormResponse(
                    true,
                    "Message received successfully."
                )
            )
        );
    }

    [HttpGet("messages")]
    public async Task<IActionResult> GetMessages()
    {
        var messages = await db.ContactMessages
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
        if (messages == null)
            return NotFound(ApiResult.Fail<List<ContactMessage>>("not found"));
        return Ok(ApiResult.Ok<List<ContactMessage>>(messages));
    }


    [HttpGet("messages/{id:int}")]
    public async Task<IActionResult> GetMessageById([FromRoute] int id)
    {
        var message = await db.ContactMessages
            .FirstOrDefaultAsync(cm => cm.Id == id);
        if (message == null)
            return NotFound(ApiResult.Fail<ContactMessage>("message not found"));
        return Ok(ApiResult.Ok<ContactMessage> (message));
    }
    [HttpPut("messages/{id:int}/read")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var message = await db.ContactMessages.FindAsync(id);

        if (message == null)
            return NotFound();

        message.IsRead = true;

        await db.SaveChangesAsync();

        return NoContent();
    }

}
