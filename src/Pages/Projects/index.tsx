import { ProjectsHeader } from './components/ProjectsHeader';
import { ProjectsGrid } from './components/ProjectsGrid';

export const Projects = () => {
    return (
        <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto min-h-screen">
            <ProjectsHeader />
            <ProjectsGrid />
        </main>
    );
};
