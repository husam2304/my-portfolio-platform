import { useQuery } from "@tanstack/react-query";
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator";
import type { Project } from "../../../types/api";
import { projectsService } from "../../../services/projects.service";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../../context/Language/useLang";
// import { useLang } from "../../../context/Language/useLang";

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
}

const ProjectCard = ({ id, title, description, imageUrl, tags }: ProjectCardProps) => {
    const navigate = useNavigate();
    return (
        <div className="group cursor-pointer relative flex flex-col overflow-hidden glass-card rounded-xl"
            onClick={() => navigate(`/projects/${id}`)}

        >
            {/* Image Section */}
            <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-fixed-dim/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-background text-4xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        visibility
                    </span>
                </div>
                <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-alt={title}
                    src={imageUrl || ''}
                    alt={title}
                />
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline-lg text-[20px] text-on-surface group-hover:text-primary-fixed-dim transition-colors">
                        {title}
                    </h3>
                    <span className="font-code-sm text-code-sm text-primary-fixed-dim">{id}</span>
                </div>
                <p className="font-body-md text-on-surface-variant text-[14px] mb-6 line-clamp-2">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-surface-variant text-on-surface-variant font-label-caps text-[10px] rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const FeaturedProjects = () => {
    // const { t: { home: { FeaturedProjects: t },lang } } = useLang();
    const { t: { home: { FeaturedProjects: t } }, lang } = useLang();
    const { data, isLoading, isError } = useQuery<Project[]>({
        queryKey: ['featured-projects', lang],
        queryFn: async () => {
            const response = await projectsService.getFeaturedProjects();
            if (!response.succeeded) {
                throw new Error(response.error || "Failed to fetch projects");
            }
            console.log("Fetched projects:", response);
            return response.data!;
        }
    });

    if (isLoading)
        return (
            <section className="py-24 bg-surface-container-lowest/50 border-y border-outline-variant/10">
                <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex items-center justify-center min-h-96">
                    <LoadingIndicator variant="dots" />
                </div>
            </section>
        );

    if (isError)
        return (
            <section className="py-24 bg-surface-container-lowest/50 border-y border-outline-variant/10">
                <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                    <div className="text-error font-body-md text-body-md">{t.error}</div>
                </div>
            </section>
        );

    return (
        <section className="py-24 bg-surface-container-lowest/50 border-y border-outline-variant/10">
            <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2 tracking-tight">
                        {t.header}
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                        {t.subheader}
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};
