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
    public class CompaniesController(AppDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var companies = await db.Companies
                .Include(c => c.JobApplications)
                .Select(c => new CompanyDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Website = c.Website,
                    ContactPerson = c.ContactPerson,
                    Notes = c.Notes,
                    CreatedAt = c.CreatedAt,
                    TotalApplications = c.JobApplications.Count,
                    LastAppliedAt = c.JobApplications
                        .OrderByDescending(j => j.AppliedAt)
                        .Select(j => j.AppliedAt)
                        .FirstOrDefault(),
                    LatestStatus = c.JobApplications
                        .OrderByDescending(j => j.UpdatedAt)
                        .Select(j => (EApplicationStatus?)j.Status)
                        .FirstOrDefault()
                        
                })
                .ToListAsync();

            return Ok(ApiResult.Ok<List<CompanyDto>>(companies));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var c = await db.Companies
                .Include(c => c.JobApplications)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (c is null) return NotFound();

            return Ok(ApiResult.Ok<CompanyDto>( new CompanyDto
            {
                Id = c.Id,
                Name = c.Name,
                Website = c.Website,
                ContactPerson = c.ContactPerson,
                Notes = c.Notes,
                CreatedAt = c.CreatedAt,
                TotalApplications = c.JobApplications.Count,
                LastAppliedAt = c.JobApplications
                    .OrderByDescending(j => j.AppliedAt)
                    .Select(j => j.AppliedAt)
                    .FirstOrDefault(),
                LatestStatus = c.JobApplications
                    .OrderByDescending(j => j.UpdatedAt)
                    .Select(j => (EApplicationStatus?)j.Status)
                    .FirstOrDefault()
            }));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCompanyDto dto)
        {
            var company = new Company
            {
                Name = dto.Name,
                Website = dto.Website,
                ContactPerson = dto.ContactPerson,
                Notes = dto.Notes
            };

            db.Companies.Add(company);
            await db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = company.Id }, company);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCompanyDto dto)
        {
            var company = await db.Companies.FindAsync(id);
            if (company is null) return NotFound();

            company.Name = dto.Name;
            company.Website = dto.Website;
            company.ContactPerson = dto.ContactPerson;
            company.Notes = dto.Notes;

            await db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var company = await db.Companies.FindAsync(id);
            if (company is null) return NotFound();

            db.Companies.Remove(company);
            await db.SaveChangesAsync();
            return NoContent();
        }
    }
}
