import { useLang } from '../../../context/Language/useLang';

export const ProjectsHeader = () => {
    const { t } = useLang();
    const projectsText = t.projects || {};

    return (
        <header className="mb-16">
            <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-4 text-primary">
                {projectsText.archive || 'PROJECT_ARCHIVE'}
            </h1>
            {/* <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                {projectsText.description || 'A repository of high-performance engineering, algorithmic explorations, and creative technologist experiments. Filter by stack or search for specific modules.'}
            </p> */}
        </header>
    );
};
