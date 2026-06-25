import { Cloud, Container, Cpu, Database, Layers, Server, Shield } from "lucide-react";
import type { ProjectDetails } from "../../../services/projectDetails.service";

export const ProjectDetailsArchitecture = ({ data }: { data: ProjectDetails }) => {
    const project = data;

    // Dynamic icon component
    const getIconComponent = (iconName: string) => {
        // This is a basic mapping - you might want to create a more comprehensive one
        const iconMap: Record<string, React.ReactNode> = {
            'database': <Database className="text-primary-container mb-4" size={36} />,
            'server': <Server className="text-primary-container mb-4" size={36} />,
            'cloud': <Cloud className="text-primary-container mb-4" size={36} />,
            'shield': <Shield className="text-primary-container mb-4" size={36} />,
            'cpu': <Cpu className="text-primary-container mb-4" size={36} />,
            'layers': <Layers className="text-primary-container mb-4" size={36} />,
            'container': <Container className="text-primary-container mb-4" size={36} />,
        };

        return iconMap[iconName] || <Layers className="text-primary-container mb-4" size={36} />;
    };

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
                                <div className={`glass p-6 rounded-lg border flex flex-col items-center text-center ${index === 0 ? 'border-primary-container/20' : 'border-outline-variant'
                                    }`}>
                                    <div className={index === 0 ? 'text-primary-container' : 'text-secondary'}>
                                        {getIconComponent(element.icon)}
                                    </div>
                                    <h3 className="mono text-xs font-bold text-white mb-2">
                                        {element.name}
                                    </h3>
                                    <p className="text-[10px] text-outline">{element.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
