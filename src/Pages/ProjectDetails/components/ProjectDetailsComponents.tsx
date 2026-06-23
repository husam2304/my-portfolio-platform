import { Link } from 'react-router-dom';
import type { ProjectDetails } from '../../../services/projectDetails.service';
import { useLang } from '../../../context/Language/useLang';

export const ProjectDetailsBreadcrumbs = () => {
    const { t } = useLang();
    const projectsText = t.projects || {};

    return (
        <div className="flex items-center gap-2 mb-8 mono text-[10px] uppercase tracking-widest text-outline">
            <Link className="hover:text-primary-container" to="/">
                Root
            </Link>
            <span>/</span>
            <Link className="hover:text-primary-container" to="/projects">
                {projectsText.archive || 'Projects'}
            </Link>
            <span>/</span>
            <span className="text-on-surface">Project_Details</span>
        </div>
    );
};

export const ProjectDetailsHero = ({ data }: { data: ProjectDetails }) => {
    const project = data;
    const { t: { projectDetails: t } } = useLang();
    return (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
            <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant w-fit mb-6">
                    <span className="size-2 rounded-full bg-primary-container animate-pulse"></span>
                    <span className="mono text-[10px] font-bold text-on-surface">
                        {project?.caseStudyLabel}
                    </span>
                </div>
                <h1 className="font-headline font-bold text-5xl md:text-6xl text-on-surface leading-[1.1] mb-6">
                    {project?.title}
                </h1>
                <p className="text-lg text-on-surface-variant leading-relaxed mb-8 max-w-xl">
                    {project?.description}
                </p>
                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col">
                        <span className="mono text-[10px] text-outline mb-1 uppercase">{t.client}</span>
                        <span className="text-on-surface font-semibold">{project?.meta.client}</span>
                    </div>
                    <div className="w-px h-10 bg-outline-variant mx-4 hidden sm:block"></div>
                    <div className="flex flex-col">
                        <span className="mono text-[10px] text-outline mb-1 uppercase">{t.techStack}</span>
                        <span className="text-on-surface font-semibold">{project?.meta.techStack}</span>
                    </div>
                    <div className="w-px h-10 bg-outline-variant mx-4 hidden sm:block"></div>
                    <div className="flex flex-col">
                        <span className="mono text-[10px] text-outline mb-1 uppercase">{t.timeline}</span>
                        <span className="text-on-surface font-semibold">{project?.meta.timeline}</span>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-5 relative group">
                <div
                    className="absolute -inset-4 bg-primary-container/10 rounded-2xl blur-3xl group-hover:bg-primary-container/20 transition-all duration-700"
                    style={{ transform: 'translate(4.59375px, -6.01487px)' }}
                ></div>
                <div className="relative aspect-square rounded-xl overflow-hidden border border-outline-variant shadow-2xl">
                    <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        data-alt={project?.imageAlt}
                        src={project?.imageUrl || ''}
                        alt={project?.title}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60"></div>
                </div>
            </div>
        </section>
    );
};

export const ProjectDetailsArchitecture = ({ data }: { data: ProjectDetails }) => {
    const project = data;

    return (
        <section className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">
                        {project?.overviewTitle}
                    </h2>
                    <p className="text-on-surface-variant max-w-2xl">{project?.overviewDescription}</p>
                </div>
                <div className="flex gap-4">
                    {project?.architectureElements.map((element) => (
                        <div key={element.name} className="flex items-center gap-2">
                            <span className="size-3 rounded-sm bg-primary-container"></span>
                            <span className="mono text-[10px] text-on-surface uppercase">
                                {element.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative w-full aspect-video md:aspect-21/9 rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low grid-bg flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    {/* Diagram Overlays */}
                    <div className="relative z-10 w-full max-w-4xl px-4 grid grid-cols-3 gap-8">
                        {project?.architectureElements.map((element, index) => (
                            <div key={element.name}>
                                {index === 0 ? (
                                    <div className="glass p-6 rounded-lg border border-primary-container/20 flex flex-col items-center text-center">
                                        <span
                                            className="material-symbols-outlined text-primary-container mb-4 text-4xl"
                                            data-icon={element.icon}
                                        >
                                            {element.icon}
                                        </span>
                                        <h3 className="mono text-xs font-bold text-white mb-2">
                                            {element.name}
                                        </h3>
                                        <p className="text-[10px] text-outline">{element.description}</p>
                                    </div>
                                ) : (
                                    <div className="glass p-6 rounded-lg border border-outline-variant flex flex-col items-center text-center">
                                        <span
                                            className="material-symbols-outlined text-secondary mb-4 text-4xl"
                                            data-icon={element.icon}
                                        >
                                            {element.icon}
                                        </span>
                                        <h3 className="mono text-xs font-bold text-white mb-2">
                                            {element.name}
                                        </h3>
                                        <p className="text-[10px] text-outline">{element.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const ProjectDetailsCodeHighlights = ({ data }: { data: ProjectDetails }) => {
    const project = data;
    const { t: { projectDetails: t } } = useLang();
    console.log("Project in Code Highlights:", data);
    return (
        <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
                <h2 className="font-headline text-3xl font-bold text-on-surface mb-6">{t.codeHighlights}</h2>
                <p className="text-on-surface-variant mb-8">
                    {t.codeHighlightsDescription}
                </p>
                <div className="space-y-4">
                    {project.codeHighlights.map((highlight) => (
                        <div
                            key={highlight.id}
                            className="p-4 rounded-lg bg-surface-container-high border border-outline-variant hover:border-primary-container transition-all cursor-default"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span
                                    className="material-symbols-outlined text-primary-container"
                                    data-icon={highlight.icon}
                                >
                                    {highlight.icon}
                                </span>
                                <span className="mono text-xs font-bold text-on-surface">
                                    {highlight.title}
                                </span>
                            </div>
                            <p className="text-sm text-on-surface-variant">{highlight.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-7">
                <div className="rounded-xl overflow-hidden border border-outline-variant bg-[#060f16] shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-surface-container-highest border-b border-outline-variant">
                        <div className="flex gap-2">
                            <div className="size-3 rounded-full bg-error/40"></div>
                            <div className="size-3 rounded-full bg-primary-container/40"></div>
                            <div className="size-3 rounded-full bg-outline/40"></div>
                        </div>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <pre className="mono text-sm leading-relaxed text-on-surface-variant whitespace-pre-wrap wrap-break-word">
                            {project.codeSnippet}
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
};
