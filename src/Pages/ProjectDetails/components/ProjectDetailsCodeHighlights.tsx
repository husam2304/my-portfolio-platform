import { CheckCircle2, Code2, Database, FileText, Globe, Shield, Zap } from "lucide-react";
import { useLang } from "../../../context/Language/useLang";
import type { ProjectDetails } from "../../../services/projectDetails.service";

export const ProjectDetailsCodeHighlights = ({ data }: { data: ProjectDetails }) => {
    const project = data;
    const { t: { projectDetails: t } } = useLang();
    console.log("Project in Code Highlights:", data);

    // Dynamic icon component for code highlights
    const getHighlightIcon = (iconName: string) => {
        const iconMap: Record<string, React.ReactNode> = {
            'typescript': <FileText className="text-primary-container" size={20} />,
            'react': <Code2 className="text-primary-container" size={20} />,
            'database': <Database className="text-primary-container" size={20} />,
            'api': <Globe className="text-primary-container" size={20} />,
            'security': <Shield className="text-primary-container" size={20} />,
            'performance': <Zap className="text-primary-container" size={20} />,
            'testing': <CheckCircle2 className="text-primary-container" size={20} />,
        };

        return iconMap[iconName] || <Code2 className="text-primary-container" size={20} />;
    };

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
                                {getHighlightIcon(highlight.icon)}
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