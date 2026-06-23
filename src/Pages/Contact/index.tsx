import { ContactHeader } from './components/ContactHeader';
import { SocialLinks } from './components/SocialLinks';
import { ContactForm } from './components/ContactForm';
import { ContactSpecs } from './components/ContactSpecs';

export const Contact = () => {
    return (
        <main className="min-h-screen pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto kinetic-bg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                {/* Left Column: Narrative */}
                <div className="lg:col-span-5 space-y-12">
                    <ContactHeader />
                    <SocialLinks />
                </div>

                {/* Right Column: Form */}
                <div className="lg:col-span-7">
                    <ContactForm />
                    <ContactSpecs />
                </div>
            </div>
        </main>
    );
};
