import { useQuery } from "@tanstack/react-query";
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator";
import { aboutService } from "../../../services/about.service";
import type { ExpertiseData } from "../../../services/about.service";
import { useLang } from "../../../context/Language/useLang";

export const ExpertiseGrid = () => {
    const { t: { about: { expertise: t } }, lang } = useLang()
    const { data, isLoading, isError } = useQuery<ExpertiseData>({
        queryKey: ['about-expertise', lang],
        queryFn: async () => {
            const response = await aboutService.getExpertise();
            if (!response.succeeded) {
                throw new Error(response.error || "Failed to fetch expertise data");
            }
            return response.data!;
        }
    });

    if (isLoading)
        return (
            <section className="mb-32">
                <div className="flex items-center justify-center py-24">
                    <LoadingIndicator variant="dots" />
                </div>
            </section>
        );

    if (isError)
        return (
            <section className="mb-32">
                <div className="text-error font-body-md">{t.error}</div>
            </section>
        );

    const skillTags = (tags: string[]) =>
        tags.map((tag) => (
            <span
                key={tag}
                className="bg-surface-container-high px-3 py-1 font-label-caps text-label-caps border border-outline-variant/30 text-primary-fixed-dim"
            >
                {tag}
            </span>
        ));

    const infraItem = (label: string, value: string) => (
        <div className="bg-background/50 p-4 border border-outline-variant/20 rounded">
            <span className="font-label-caps text-[10px] text-outline block mb-1">{label}</span>
            <span className="font-code-sm text-code-sm text-primary-fixed-dim">{value}</span>
        </div>
    );

    const frontend = data?.skills.find(s => s.category === "Frontend");
    const backend = data?.skills.find(s => s.category === "Backend");
    const infrastructure = data?.skills.find(s => s.category !== "Frontend" && s.category !== "Backend");

    return (
        <section className="mb-32">
            <div className="flex items-center justify-between mb-12 kinetic-border pb-4">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Technical Expertise</h2>
                <span className="font-code-sm text-code-sm text-outline">0x45_SKILLS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-gutter">
                {/* Frontend */}
                {frontend && (
                    <div className="md:col-span-2 glass-card p-8 flex flex-col justify-between min-h-75">
                        <div>
                            <span className="material-symbols-outlined text-primary-fixed-dim mb-4 text-4xl">
                                {frontend.icon}
                            </span>
                            <h3 className="font-headline-lg text-headline-lg mb-4 text-on-surface">{frontend.title}</h3>
                            <p className="text-on-surface-variant font-body-md mb-6">{frontend.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">{skillTags(frontend.tags)}</div>
                    </div>
                )}

                {/* Backend */}
                {backend && (
                    <div className="md:col-span-2 glass-card p-8 flex flex-col justify-between min-h-75">
                        <div>
                            <span className="material-symbols-outlined text-primary-fixed-dim mb-4 text-4xl">
                                {backend.icon}
                            </span>
                            <h3 className="font-headline-lg text-headline-lg mb-4 text-on-surface">{backend.title}</h3>
                            <p className="text-on-surface-variant font-body-md mb-6">{backend.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">{skillTags(backend.tags)}</div>
                    </div>
                )}

                {/* Cloud / Infrastructure */}
                {infrastructure && (
                    <div className="md:col-span-4 glass-card p-8 flex flex-col md:flex-row gap-8 items-center bg-linear-to-br from-surface to-surface-container-low">
                        <div className="md:w-1/3">
                            <span className="material-symbols-outlined text-primary-fixed-dim mb-4 text-4xl">
                                {infrastructure.icon}
                            </span>
                            <h3 className="font-headline-lg text-headline-lg mb-2 text-on-surface">{infrastructure.title}</h3>
                            <p className="text-on-surface-variant font-body-md">{infrastructure.description}</p>
                        </div>
                        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {infrastructure.tags.map((tag, index) => {
                                const labels = ['PLATFORM', 'OPS', 'PIPELINE', 'MONITOR'];
                                return infraItem(labels[index] || `TECH_${index}`, tag);
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
