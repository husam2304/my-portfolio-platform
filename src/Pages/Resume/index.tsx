import { ResumeHeader } from './components/ResumeHeader';
import { TechnicalStack } from './components/TechnicalStack';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Publications } from './components/Publications';

export const Resume = () => {
    return (
        <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-visible">
            <ResumeHeader />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Sidebar */}
                <aside className="lg:col-span-4 order-2 lg:order-1">
                    <div className="sticky top-24 space-y-12">
                        <TechnicalStack />
                        <Certifications />
                        <Education />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="lg:col-span-8 order-1 lg:order-2 space-y-16">
                    <Experience />
                    <Publications />
                </div>
            </div>
        </main>
    );
};
