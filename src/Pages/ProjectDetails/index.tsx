import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '../../components/ui/LoadingIndicator';
import { projectDetailsService } from '../../services/projectDetails.service';
import type { ProjectDetails as ProjectDetailsType } from '../../services/projectDetails.service';
import {
    ProjectDetailsBreadcrumbs,
    ProjectDetailsHero,
    ProjectDetailsArchitecture,
    ProjectDetailsCodeHighlights,
} from './components/ProjectDetailsComponents';
import { useLang } from '../../context/Language/useLang';

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
            <ProjectDetailsArchitecture data={data} />
            <ProjectDetailsCodeHighlights data={data} />
        </main>
    );
};
