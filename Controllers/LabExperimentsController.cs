using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.DTOs;
using Portfolio.API.DTOs.Lab;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LabExperimentsController(AppDbContext db) : ControllerBase
{
    [HttpGet("get-experiments")]
    public async Task<IActionResult> GetExperiments()
    {
        var exp = await db.LabExperiments.FirstOrDefaultAsync();
        if (exp is null) return NotFound(ApiResult.Fail<LabExperimentDto>("Lab experiment not configured."));
        return Ok(ApiResult.Ok(new LabExperimentDto(exp.ExperimentId, exp.Title, exp.Description, exp.CpuUsage, exp.NetworkUsage)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("experiment")]
    public async Task<IActionResult> Upsert([FromBody] UpsertLabExperimentRequest request)
    {
        var exp = await db.LabExperiments.FirstOrDefaultAsync() ?? new LabExperiment();
        var isNew = exp.Id == 0;

        exp.ExperimentId = request.ExperimentId;
        exp.Title = request.Title;
        exp.Description = request.Description;
        exp.CpuUsage = request.CpuUsage;
        exp.NetworkUsage = request.NetworkUsage;

        if (isNew) db.LabExperiments.Add(exp);
        await db.SaveChangesAsync();
        return Ok(ApiResult.Ok(new LabExperimentDto(exp.ExperimentId, exp.Title, exp.Description, exp.CpuUsage, exp.NetworkUsage)));
    }
}
