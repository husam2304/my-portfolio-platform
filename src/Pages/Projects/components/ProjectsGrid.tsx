import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '../../../components/ui/LoadingIndicator';
import { projectsService } from '../../../services/projects.service';
import type { Project } from '../../../types/api';
import { ArrowUpRight, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../../context/Language/useLang';

interface ProjectCardProps extends Project {
    index: number;
}

const ProjectCard = ({ index, id, title, description, imageUrl, tags, isFeatured }: ProjectCardProps) => {

    const { t: { projects: t } } = useLang()
    // Determine grid span based on index (bento layout pattern)

    const navigate = useNavigate();
    const getGridClass = (idx: number) => {
        switch (idx % 5) {
            case 0:
                return 'md:col-span-8'; // Large featured
            case 1:
                return 'md:col-span-4'; // Medium
            case 2:
                return 'md:col-span-4'; // Small/Standard
            case 3:
                return 'md:col-span-4'; // Small/Standard
            case 4:
                return 'md:col-span-4'; // Large Vertical
            default:
                return 'md:col-span-4';
        }
    };

    const hasImage = imageUrl && imageUrl !== '';
    console.log('ProjectCard Rendered:', { index, title, isFeatured, hasImage });

    if (isFeatured && hasImage) {
        return (
            <article className={`project-card cursor-pointer ${getGridClass(index)} group bg-surface-container-low border border-outline-variant/10 overflow-hidden transition-all duration-300 flex flex-col`}
                onClick={() => navigate(`/projects/${id}`)}
            >
                <div className="aspect-video relative overflow-hidden bg-surface-container-high">
                    <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent z-10"></div>
                    <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        data-alt={title}
                        src={imageUrl || ''}
                        alt={title}
                    />
                    <div className="absolute bottom-6 left-6 z-20">
                        <span className="bg-primary-container text-on-primary-container px-2 py-1 font-label-caps text-[10px] mb-2 inline-block">
                            {t.coreProject || 'CORE_PROJECT'}
                        </span>
                        <h3 className="font-headline-lg text-headline-lg text-primary">{title}</h3>
                    </div>
                </div>
                <div className="p-8 grow flex flex-col justify-between">
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                        {description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex gap-4">
                            {tags.map((tag) => (
                                <span key={tag} className="font-label-caps text-label-caps text-primary-fixed-dim">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <a className="text-on-surface hover:text-primary transition-colors flex items-center gap-2 font-label-caps text-label-caps" href="#">
                            {t.viewSource || 'VIEW_SOURCE'}
                            <ArrowUpRight />
                        </a>
                    </div>
                </div>
            </article>
        );
    } else if (index % 5 === 1 && hasImage) {
        return (
            <article className={`project-card cursor-pointer ${getGridClass(index)} group bg-surface-container-low border border-outline-variant/10 overflow-hidden transition-all duration-300 flex flex-col`} onClick={() => navigate(`/projects/${id}`)}>
                <div className="aspect-square relative overflow-hidden bg-surface-container-high">
                    <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        data-alt={title}
                        src={imageUrl || ''}
                        alt={title}
                    />
                    <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-6">
                    <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">
                        {title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">
                        {description}
                    </p>
                    <div className="flex gap-4 font-label-caps text-label-caps text-secondary">
                        {tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            </article>
        );
    } else if (index % 5 === 4 && hasImage) {
        return (
            <article className={`project-card cursor-pointer ${getGridClass(index)} group bg-surface-container-low border border-outline-variant/10 overflow-hidden transition-all duration-300 flex flex-col`}
                onClick={() => navigate(`/projects/${id}`)}
            >
                <div className="h-48 relative overflow-hidden bg-surface-container-high">
                    <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        data-alt={title}
                        src={imageUrl || ''}
                        alt={title}
                    />
                </div>
                <div className="p-6 grow">
                    <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">
                        {title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">
                        {description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-outline-variant/10 flex flex-wrap gap-3">
                        {tags.map((tag) => (
                            <span key={tag} className="font-label-caps text-label-caps text-primary-fixed-dim">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </article>
        );
    } else {
        // Standard card without large image
        return (
            <article className={`project-card cursor-pointer ${getGridClass(index)} group bg-surface-container-low border border-outline-variant/10 p-6 transition-all duration-300`} onClick={() => navigate(`/projects/${id}`)}
            >
                <div className="flex items-start justify-between mb-8">
                    <Database className="text-primary-fixed-dim text-4xl" size={24} />
                    <span className="font-code-sm text-code-sm text-outline">{id}</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">
                    {title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">
                    {description}
                </p>
                <div className="pt-6 border-t border-outline-variant/10 flex flex-wrap gap-3">
                    {tags.map((tag) => (
                        <span key={tag} className="font-label-caps text-label-caps text-primary-fixed-dim">
                            {tag}
                        </span>
                    ))}
                </div>
            </article>
        );
    }
};

export const ProjectsGrid = () => {
    const { t: { projects: t } } = useLang();
    const { data, isLoading, isError } = useQuery<Project[]>({
        queryKey: ['all-projects'],
        queryFn: async () => {
            const response = await projectsService.getAllProjects();
            if (!response.succeeded) {
                throw new Error(response.error || 'Failed to fetch projects');
            }
            return response.data!;
        },
    });

    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-96">
                <LoadingIndicator variant="dots" />
            </div>
        );

    if (isError)
        return (
            <div className="text-error font-body-md text-body-md">
                {t.error || 'Error loading projects'}
            </div>
        );

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {data?.map((project, index) => (
                <ProjectCard key={project.id} {...project} index={index} />
            ))}
        </div>
    );
};
