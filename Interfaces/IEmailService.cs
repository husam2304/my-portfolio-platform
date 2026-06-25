using Portfolio.API.DTOs.Contact;

namespace Portfolio.API.Interfaces
{
    public interface IEmailService
    {
        Task SendContactEmail(ContactFormRequest request);

    }
}
