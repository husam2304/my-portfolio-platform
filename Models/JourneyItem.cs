namespace Portfolio.API.Models;

public class JourneyItem
{
    public int Id { get; set; }
    public int GroupId { get; set; }
    public string Lang { get; set; } = "en";
    public string Period { get; set; } = string.Empty;    // lang-neutral
    public string Position { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public bool Highlighted { get; set; }                 // lang-neutral
    public int SortOrder { get; set; }                    // lang-neutral
}
