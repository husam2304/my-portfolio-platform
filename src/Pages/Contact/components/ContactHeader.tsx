import { useLang } from '../../../context/Language/useLang';

export const ContactHeader = () => {
    const { t } = useLang();
    const contactText = t.contact || {};

    return (
        <header>
            <span className="font-label-caps text-label-caps text-primary-fixed-dim tracking-widest block mb-4">
                {contactText.establishConnection || 'ESTABLISH_CONNECTION'}
            </span>
            <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background">
                {contactText.title || "Let's build something"} <span className="text-primary-fixed-dim italic">{contactText.exceptional || 'exceptional'}</span>.
            </h1>
            <p className="text-on-surface-variant mt-6 max-w-md">
                {contactText.description || 'Available for architectural consulting, full-stack development, and experimental visual interfaces. Reach out via the protocol below or through social nodes.'}
            </p>
        </header>
    );
};
