using Microsoft.EntityFrameworkCore;
using Portfolio.API.Models;
using System.Reflection.Emit;

namespace Portfolio.API.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // Admin
    public DbSet<Admin> Admins => Set<Admin>();

    // Home
    public DbSet<HeroSection> HeroSections => Set<HeroSection>();

    // Core Stack
    public DbSet<CoreStackItem> CoreStackItems => Set<CoreStackItem>();

    // Projects
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectLocalise> ProjectLocalises => Set<ProjectLocalise>();
    public DbSet<ProjectTag> ProjectTags => Set<ProjectTag>();
    public DbSet<ProjectArchitectureElement> ProjectArchitectureElements => Set<ProjectArchitectureElement>();
    public DbSet<ProjectCodeHighlight> ProjectCodeHighlights => Set<ProjectCodeHighlight>();


    // Lab
    public DbSet<LabExperiment> LabExperiments => Set<LabExperiment>();

    // About
    public DbSet<Philosophy> Philosophies => Set<Philosophy>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<SkillTag> SkillTags => Set<SkillTag>();
    public DbSet<JourneyItem> JourneyItems => Set<JourneyItem>();

    // Resume
    public DbSet<TechStackItem> TechStackItems => Set<TechStackItem>();
    public DbSet<Certification> Certifications => Set<Certification>();
    public DbSet<EducationItem> EducationItems => Set<EducationItem>();
    public DbSet<ExperienceItem> ExperienceItems => Set<ExperienceItem>();
    public DbSet<ExperienceAchievement> ExperienceAchievements => Set<ExperienceAchievement>();
    public DbSet<ExperienceTag> ExperienceTags => Set<ExperienceTag>();
    public DbSet<Publication> Publications => Set<Publication>();
    public DbSet<ResumeFile> ResumeFiles => Set<ResumeFile>();

    // Contact
    public DbSet<SocialLink> SocialLinks => Set<SocialLink>();
    public DbSet<ContactSpec> ContactSpecs => Set<ContactSpec>();

    public DbSet<ContactMessage> ContactMessages { get; set; }

    // Companies
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<JobApplication> JobApplications => Set<JobApplication>();


    protected override void OnModelCreating(ModelBuilder mb)
    {
        base.OnModelCreating(mb);

        

        mb.Entity<HeroSection>().Property(h => h.Lang).HasMaxLength(2).HasDefaultValue("en");
        mb.Entity<HeroSection>().HasIndex(h => h.Lang);
        mb.Entity<HeroSection>().HasIndex(h => h.GroupId);

        mb.Entity<Philosophy>().Property(p => p.Lang).HasMaxLength(2).HasDefaultValue("en");
        mb.Entity<Philosophy>().HasIndex(p => p.Lang);
        mb.Entity<Philosophy>().HasIndex(p => p.GroupId);

        mb.Entity<JourneyItem>().Property(j => j.Lang).HasMaxLength(2).HasDefaultValue("en");
        mb.Entity<JourneyItem>().HasIndex(j => j.Lang);
        mb.Entity<JourneyItem>().HasIndex(j => j.GroupId);


        // ── Relationships ─────────────────────────────────────
        mb.Entity<ProjectTag>()
            .HasOne(t => t.Project).WithMany(p => p.Tags)
            .HasForeignKey(t => t.ProjectId).OnDelete(DeleteBehavior.Cascade);


        mb.Entity<ProjectLocalise>()
            .HasOne(t => t.Project).WithMany(p => p.ProjectLocalises)
            .HasForeignKey(t => t.ProjectId).OnDelete(DeleteBehavior.Cascade);

        mb.Entity<ProjectArchitectureElement>()
            .HasOne(e => e.Project).WithMany(p => p.ArchitectureElements)
            .HasForeignKey(e => e.ProjectId).OnDelete(DeleteBehavior.Cascade);

        mb.Entity<ProjectCodeHighlight>()
            .HasOne(h => h.Project).WithMany(p => p.CodeHighlights)
            .HasForeignKey(h => h.ProjectId).OnDelete(DeleteBehavior.Cascade);

        mb.Entity<SkillTag>()
            .HasOne(t => t.Skill).WithMany(s => s.Tags)
            .HasForeignKey(t => t.SkillId).OnDelete(DeleteBehavior.Cascade);

        mb.Entity<ExperienceAchievement>()
            .HasOne(a => a.ExperienceItem).WithMany(e => e.Achievements)
            .HasForeignKey(a => a.ExperienceItemId).OnDelete(DeleteBehavior.Cascade);

        mb.Entity<ExperienceTag>()
            .HasOne(t => t.ExperienceItem).WithMany(e => e.Tags)
            .HasForeignKey(t => t.ExperienceItemId).OnDelete(DeleteBehavior.Cascade);


        mb.Entity<JobApplication>()
            .HasOne(j => j.Company)
            .WithMany(c => c.JobApplications)
            .HasForeignKey(j => j.CompanyId)
            .OnDelete(DeleteBehavior.Cascade);


    }
}
