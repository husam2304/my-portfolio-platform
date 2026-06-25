namespace Portfolio.API.Models;

public class Certification
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
    public int Year { get; set; }
    public int SortOrder { get; set; }
}
