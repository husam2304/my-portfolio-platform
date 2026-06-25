namespace Portfolio.API.DTOs.CoreStack;

public record UpsertCoreStackItemRequest(string Icon, string Name, int SortOrder = 0);
