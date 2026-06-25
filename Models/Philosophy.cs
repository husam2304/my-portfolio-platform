namespace Portfolio.API.Models;

public class Philosophy
{
    public int Id { get; set; }
    public int GroupId { get; set; }
    public string Lang { get; set; } = "en";
    public string Label { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;  // lang-neutral
}
