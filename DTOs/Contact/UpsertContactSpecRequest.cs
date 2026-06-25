namespace Portfolio.API.DTOs.Contact;

public record UpsertContactSpecRequest(string Label, string Value, int SortOrder = 0);
