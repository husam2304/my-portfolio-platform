using Microsoft.AspNetCore.Http;

namespace Portfolio.API.Helper;

public static class LanguageHelper
{
    private const string DefaultLang = "en";


    public const string En = "en";
    public const string Ar = "ar";
    private static readonly HashSet<string> SupportedLanguages =
        new(StringComparer.OrdinalIgnoreCase)
        {
            En,
            Ar
        };

    public static string GetLang(HttpRequest request)
    {
        var acceptLanguage = request.Headers.AcceptLanguage.ToString();

        if (string.IsNullOrWhiteSpace(acceptLanguage))
            return DefaultLang;

        var bestLang = acceptLanguage
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select((part, index) =>
            {
                var sections = part.Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

                var lang = NormalizeLang(sections[0]);

                var quality = 1.0;

                if (sections.Length > 1 && sections[1].StartsWith("q=", StringComparison.OrdinalIgnoreCase))
                {
                    var qValue = sections[1][2..];

                    if (double.TryParse(qValue, out var parsedQuality))
                        quality = parsedQuality;
                }

                return new
                {
                    Lang = lang,
                    Quality = quality,
                    Index = index
                };
            })
            .Where(x => SupportedLanguages.Contains(x.Lang))
            .OrderByDescending(x => x.Quality)
            .ThenBy(x => x.Index)
            .Select(x => x.Lang)
            .FirstOrDefault();

        return bestLang ?? DefaultLang;
    }

    private static string NormalizeLang(string lang)
    {
        if (string.IsNullOrWhiteSpace(lang))
            return DefaultLang;

        lang = lang.Trim().ToLowerInvariant();

        // Example:
        // ar-JO => ar
        // en-US => en
        if (lang.Contains('-'))
            lang = lang.Split('-')[0];

        return lang;
    }
}