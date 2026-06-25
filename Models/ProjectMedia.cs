using Portfolio.API.Enum;

namespace Portfolio.API.Models;

public class ProjectMedia
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public EMediaType Type { get; set; }

    public string MediaUri { get; set; }

    public Project Project { get; set; }
}