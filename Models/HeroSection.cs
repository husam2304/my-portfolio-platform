namespace Portfolio.API.Models;

public class HeroSection
{
    public int Id { get; set; }
    public int GroupId { get; set; }        // ties en + ar rows together
    public string Lang { get; set; } = "en";
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
