namespace Portfolio.API.DTOs.Contact;

public record UpsertSocialLinkRequest(string Name, string Handle, string Url, string Icon, int SortOrder = 0);
