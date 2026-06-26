using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.DTOs;
using Portfolio.API.Enum;
using Portfolio.API.Models;


namespace Portfolio.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class JobApplicationsController(AppDbContext db, IWebHostEnvironment env) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] EApplicationStatus? status)
        {
            var query = db.JobApplications
                .Include(j => j.Company)
                .AsQueryable();

            if (status.HasValue)
                query = query.Where(j => j.Status == status.Value);

            var result = await query
                .OrderByDescending(j => j.UpdatedAt)
                .Select(j => new JobApplicationDto
                {
                    Id = j.Id,
                    CompanyId = j.CompanyId,
                    CompanyName = j.Company.Name,
                    JobTitle = j.JobTitle,
                    AppliedAt = j.AppliedAt,
                    Status = j.Status,
                    CvFileName = j.CvFileName,
                    Notes = j.Notes,
                    CreatedAt = j.CreatedAt,
                    UpdatedAt = j.UpdatedAt
                })
                .ToListAsync();

            return Ok(ApiResult.Ok<List<JobApplicationDto>>(result));
        }

        [HttpGet("by-company/{companyId}")]
        public async Task<IActionResult> GetByCompany(int companyId)
        {
            var result = await db.JobApplications
                .Where(j => j.CompanyId == companyId)
                .Include(j => j.Company)
                .OrderByDescending(j => j.AppliedAt)
                .Select(j => new JobApplicationDto
                {
                    Id = j.Id,
                    CompanyId = j.CompanyId,
                    CompanyName = j.Company.Name,
                    JobTitle = j.JobTitle,
                    AppliedAt = j.AppliedAt,
                    Status = j.Status,
                    CvFileName = j.CvFileName,
                    Notes = j.Notes,
                    CreatedAt = j.CreatedAt,
                    UpdatedAt = j.UpdatedAt
                })
                .ToListAsync();

            return Ok(ApiResult.Ok< List<JobApplicationDto> >(result));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateJobApplicationDto dto, IFormFile? cvFile)
        {
            var company = await db.Companies.FindAsync(dto.CompanyId);
            if (company is null) return BadRequest("Company not found");

            string? cvFileName = null;
            if (cvFile is not null)
                cvFileName = await SaveCvFile(cvFile);

            var application = new JobApplication
            {
                CompanyId = dto.CompanyId,
                JobTitle = dto.JobTitle,
                AppliedAt = dto.AppliedAt,
                Status = dto.Status,
                Notes = dto.Notes,
                CvFileName = cvFileName
            };

            db.JobApplications.Add(application);
            await db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetByCompany), new { companyId = dto.CompanyId });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] UpdateJobApplicationDto dto, IFormFile? cvFile)
        {
            var application = await db.JobApplications.FindAsync(id);
            if (application is null) return NotFound();

            application.JobTitle = dto.JobTitle;
            application.AppliedAt = dto.AppliedAt;
            application.Status = dto.Status;
            application.Notes = dto.Notes;
            application.UpdatedAt = DateTime.UtcNow;

            if (cvFile is not null)
                application.CvFileName = await SaveCvFile(cvFile);
            await db.SaveChangesAsync();
            return NoContent();
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] EApplicationStatus status)
        {
            var application = await db.JobApplications.FindAsync(id);
            if (application is null) return NotFound();

            application.Status = status;
            application.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var application = await db.JobApplications.FindAsync(id);
            if (application is null) return NotFound();

            db.JobApplications.Remove(application);
            await db.SaveChangesAsync();
            return NoContent();
        }

        private async Task<string> SaveCvFile(IFormFile file)
        {
            var uploadsFolder = Path.Combine(env.WebRootPath, "uploads", "cvs");
            Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return fileName;
        }
    }
}
