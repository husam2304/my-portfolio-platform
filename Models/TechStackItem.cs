namespace Portfolio.API.Models;

// ── Resume ───────────────────────────────────────────────────
public class TechStackItem
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public int SortOrder { get; set; }
}
