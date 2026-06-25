import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '../../components/ui/LoadingIndicator';
import { projectDetailsService } from '../../services/projectDetails.service';
import type { ProjectDetails as ProjectDetailsType } from '../../services/projectDetails.service';

import { useLang } from '../../context/Language/useLang';
import { ProjectDetailsBreadcrumbs } from './components/ProjectDetailsBreadcrumbs';
import { ProjectDetailsHero } from './components/ProjectDetailsHero';
import { ProjectDetailsLinks } from './components/ProjectDetailsLinks';
import { ProjectDetailsMedia } from './components/ProjectDetailsMedia';
import { ProjectDetailsArchitecture } from './components/ProjectDetailsArchitecture';
import { ProjectDetailsCodeHighlights } from './components/ProjectDetailsCodeHighlights';

export const ProjectDetails = () => {
    const { t: { projectDetails: t } } = useLang();
    const { projectId = '001' } = useParams<{ projectId: string }>();

    const { data, isLoading, isError } = useQuery<ProjectDetailsType>({
        queryKey: ['project-details', projectId],
        queryFn: async () => {
            const response = await projectDetailsService.getProjectDetails(projectId);
            if (!response.succeeded) {
                throw new Error(response.error || 'Failed to fetch project details');
            }
            return response.data!;
        },
    });

    if (isLoading)
        return (
            <main className="flex-1 max-w-container-max mx-auto w-full px-6 md:px-12 lg:px-20 py-12 flex items-center justify-center min-h-screen">
                <LoadingIndicator variant="dots" />
            </main>
        );

    if (isError || !data)
        return (
            <main className="flex-1 max-w-container-max mx-auto w-full px-6 md:px-12 lg:px-20 py-12">
                <div className="text-error font-body-md text-body-md">{t.error}</div>
            </main>
        );

    return (
        <main className="flex-1 max-w-container-max mx-auto w-full px-6 md:px-12 lg:px-20 py-12">
            <ProjectDetailsBreadcrumbs />
            <ProjectDetailsHero data={data} />
            <ProjectDetailsLinks data={data} />
            <ProjectDetailsMedia data={data} />
            <ProjectDetailsArchitecture data={data} />
            <ProjectDetailsCodeHighlights data={data} />
        </main>
    );
};