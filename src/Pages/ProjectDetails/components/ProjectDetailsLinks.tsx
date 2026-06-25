import { Code2, Eye, Globe, Smartphone } from "lucide-react";
import { useLang } from "../../../context/Language/useLang";
import type { ProjectDetails } from "../../../services/projectDetails.service";

export const ProjectDetailsLinks = ({ data }: { data: ProjectDetails }) => {
    const { t: { projectDetails: t } } = useLang();
    const project = data;

    // Check if there are any links to display
    const hasLinks = project?.viewLink || project?.websiteLink || project?.appLink || project?.githubLink;

    if (!hasLinks) return null;

    return (
        <section className="mb-24">
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-8">
                {t.links || 'Project Links'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project?.viewLink && (
                    <a
                        href={project.viewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 rounded-xl bg-surface-container-high border border-outline-variant hover:border-primary-container transition-all duration-300 hover:shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Eye className="text-primary-container group-hover:scale-110 transition-transform" size={24} />
                            <h3 className="mono text-sm font-bold text-on-surface">
                                {t.viewProject || 'View Project'}
                            </h3>
                        </div>
                        <p className="text-xs text-on-surface-variant truncate">
                            {project.viewLink}
                        </p>
                    </a>
                )}

                {project?.websiteLink && (
                    <a
                        href={project.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 rounded-xl bg-surface-container-high border border-outline-variant hover:border-primary-container transition-all duration-300 hover:shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Globe className="text-primary-container group-hover:scale-110 transition-transform" size={24} />
                            <h3 className="mono text-sm font-bold text-on-surface">
                                {t.website || 'Website'}
                            </h3>
                        </div>
                        <p className="text-xs text-on-surface-variant truncate">
                            {project.websiteLink}
                        </p>
                    </a>
                )}

                {project?.appLink && (
                    <a
                        href={project.appLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 rounded-xl bg-surface-container-high border border-outline-variant hover:border-primary-container transition-all duration-300 hover:shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Smartphone className="text-primary-container group-hover:scale-110 transition-transform" size={24} />
                            <h3 className="mono text-sm font-bold text-on-surface">
                                {t.appLink || 'App'}
                            </h3>
                        </div>
                        <p className="text-xs text-on-surface-variant truncate">
                            {project.appLink}
                        </p>
                    </a>
                )}

                {project?.githubLink && (
                    <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 rounded-xl bg-surface-container-high border border-outline-variant hover:border-primary-container transition-all duration-300 hover:shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Code2 className="text-primary-container group-hover:scale-110 transition-transform" size={24} />
                            <h3 className="mono text-sm font-bold text-on-surface">
                                {t.github || 'GitHub'}
                            </h3>
                        </div>
                        <p className="text-xs text-on-surface-variant truncate">
                            {project.githubLink}
                        </p>
                    </a>
                )}
            </div>
        </section>
    );
};