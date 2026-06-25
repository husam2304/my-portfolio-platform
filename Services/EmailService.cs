using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Portfolio.API.DTOs.Contact;
using Portfolio.API.Interfaces;
using System.Net.Mail;

public class EmailService : IEmailService
{
    private readonly EmailSettings _settings;

    public EmailService(IOptions<EmailSettings> settings)
    {
        _settings = settings.Value;
    }

    public async Task SendContactEmail(ContactFormRequest request)
    {
        var email = new MimeMessage();

        email.From.Add(
            new MailboxAddress("Portfolio Contact Form",
            _settings.Username));

        email.To.Add(
            MailboxAddress.Parse(_settings.ToEmail));

        // Makes Reply button reply to visitor
        email.ReplyTo.Add(
            MailboxAddress.Parse(request.Email));

        email.Subject = request.Subject;

        email.Body = new TextPart("plain")
        {
            Text = $"""
                    Name: {request.Name}
                    Email: {request.Email}

                    Message:
                    {request.Message}
                    """
        };

        using var smtp = new MailKit.Net.Smtp.SmtpClient();

        await smtp.ConnectAsync(
            _settings.Host,
            _settings.Port,
            SecureSocketOptions.StartTls);

        await smtp.AuthenticateAsync(
            _settings.Username,
            _settings.Password);

        await smtp.SendAsync(email);

        await smtp.DisconnectAsync(true);
    }
}