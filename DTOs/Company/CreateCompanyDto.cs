namespace Portfolio.API.DTOs
{
    public class CreateCompanyDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Website { get; set; }
        public string? ContactPerson { get; set; }
        public string? Notes { get; set; }
    }
}
