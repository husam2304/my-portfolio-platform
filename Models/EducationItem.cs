namespace Portfolio.API.Models;

public class EducationItem
{
    public int Id { get; set; }
    public string Degree { get; set; } = string.Empty;
    public string Institution { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string? Focus { get; set; }
    public int SortOrder { get; set; }
}
