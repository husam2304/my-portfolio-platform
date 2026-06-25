namespace Portfolio.API.DTOs.About;

public record UpsertJourneyItemRequest(
    string Period, string Position, string Company,
    bool Highlighted, int SortOrder = 0);
