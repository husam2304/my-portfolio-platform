import { useLang } from "../../../context/Language/useLang";
import type { ProjectDetails } from "../../../services/projectDetails.service";

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