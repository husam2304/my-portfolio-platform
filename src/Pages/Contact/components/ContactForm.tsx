import { useState } from 'react';
import { useLang } from '../../../context/Language/useLang';
import { contactService } from '../../../services/contact.service';
import { CheckCircleIcon, Send } from 'lucide-react';

export const ContactForm = () => {
    const { t } = useLang();
    const contactText = t.contact || {};

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await contactService.submitContactForm(formData);
            if (response.succeeded) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setIsSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-surface-container border border-outline-variant/10 p-8 md:p-12 relative overflow-hidden">
            {/* Subtle glass background effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed-dim/10 blur-[100px] pointer-events-none"></div>

            {isSuccess ? (
                <div className="absolute inset-0 bg-surface-container flex flex-col items-center justify-center text-center p-8 z-20">
                    <div className="w-20 h-20 bg-primary-fixed-dim/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircleIcon className="w-10 h-10 text-primary-fixed-dim" />
                    </div>
                    <h2 className="font-headline-lg text-headline-lg mb-2">
                        {contactText.successTitle || 'Message Synchronized'}
                    </h2>
                    <p className="text-on-surface-variant font-body-md max-w-xs">
                        {contactText.successMessage || 'Data packet received. I will review your inquiry and initiate a response shortly.'}
                    </p>
                </div>
            ) : (
                <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2 group">
                            <label className="font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-primary-fixed-dim transition-colors" htmlFor="name">
                                {contactText.nameLabel || 'IDENTIFIER'}
                            </label>
                            <input
                                className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 py-3 px-0 focus:ring-0 font-body-md text-on-surface placeholder:text-outline-variant/50"
                                id="name"
                                name="name"
                                placeholder={contactText.namePlaceholder || 'Full Name'}
                                required
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-primary-fixed-dim transition-colors" htmlFor="email">
                                {contactText.emailLabel || 'ELECTRONIC_MAIL'}
                            </label>
                            <input
                                className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 py-3 px-0 focus:ring-0 font-body-md text-on-surface placeholder:text-outline-variant/50"
                                id="email"
                                name="email"
                                placeholder={contactText.emailPlaceholder || 'email@provider.com'}
                                required
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="space-y-2 group">
                        <label className="font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-primary-fixed-dim transition-colors" htmlFor="subject">
                            {contactText.subjectLabel || 'SUBJECT_HEADER'}
                        </label>
                        <input
                            className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 py-3 px-0 focus:ring-0 font-body-md text-on-surface placeholder:text-outline-variant/50"
                            id="subject"
                            name="subject"
                            placeholder={contactText.subjectPlaceholder || "What's this regarding?"}
                            required
                            type="text"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2 group">
                        <label className="font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-primary-fixed-dim transition-colors" htmlFor="message">
                            {contactText.messageLabel || 'CONTENT_BODY'}
                        </label>
                        <textarea
                            className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 py-3 px-0 focus:ring-0 font-body-md text-on-surface placeholder:text-outline-variant/50 resize-none"
                            id="message"
                            name="message"
                            placeholder={contactText.messagePlaceholder || 'Describe your project or inquiry...'}
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="font-code-sm text-code-sm text-outline-variant max-w-xs">
                            {contactText.disclaimer || 'By clicking transmit, you agree to the automated processing of your message data for communication purposes.'}
                        </p>
                        <button
                            className="w-full md:w-auto bg-primary-fixed-dim text-on-primary px-10 py-4 font-label-caps font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,219,233,0.3)] active:scale-95 transition-all disabled:opacity-50"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="inline-block animate-spin">⏳</span>
                                    {contactText.sending || 'SENDING...'}
                                </>
                            ) : (
                                <>
                                    {contactText.transmitButton || 'TRANSMIT_PROTOCOL'}
                                    <Send className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
