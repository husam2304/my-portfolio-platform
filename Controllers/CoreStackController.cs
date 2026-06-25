using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.DTOs;
using Portfolio.API.DTOs.CoreStack;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoreStackController(AppDbContext db) : ControllerBase
{
    /// <summary>Get all core stack items</summary>
    [HttpGet("get-core-stack")]
    public async Task<IActionResult> GetCoreStack()
    {
        var items = await db.CoreStackItems
            .OrderBy(i => i.SortOrder)
            .Select(i => new CoreStackItemDto(i.Id, i.Icon, i.Name))
            .ToListAsync();

        return Ok(ApiResult.Ok(items));
    }

    /// <summary>[Admin] Add a core stack item</summary>
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UpsertCoreStackItemRequest request)
    {
        var item = new CoreStackItem
        {
            Icon = request.Icon,
            Name = request.Name,
            SortOrder = request.SortOrder
        };
        db.CoreStackItems.Add(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new CoreStackItemDto(item.Id, item.Icon, item.Name)));
    }

    /// <summary>[Admin] Update a core stack item</summary>
    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpsertCoreStackItemRequest request)
    {
        var item = await db.CoreStackItems.FindAsync(id);
        if (item is null) return NotFound(ApiResult.Fail<CoreStackItemDto>("Item not found."));

        item.Icon = request.Icon;
        item.Name = request.Name;
        item.SortOrder = request.SortOrder;
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new CoreStackItemDto(item.Id, item.Icon, item.Name)));
    }

    /// <summary>[Admin] Delete a core stack item</summary>
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await db.CoreStackItems.FindAsync(id);
        if (item is null) return NotFound(ApiResult.Fail<object>("Item not found."));

        db.CoreStackItems.Remove(item);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok<object>(new { deleted = true }));
    }
}
