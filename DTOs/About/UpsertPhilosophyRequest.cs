namespace Portfolio.API.DTOs;

public record UpsertPhilosophyRequest(
    string Label, string Title, string Description,
    string? ImageUrl);
