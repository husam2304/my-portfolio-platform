import { useQuery } from "@tanstack/react-query";
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator";
import { aboutService } from "../../../services/about.service";
import type { ExpertiseData, Skill } from "../../../services/about.service";
import { useLang } from "../../../context/Language/useLang";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

// Dynamic icon resolver
const DynamicIcon = ({ name, ...props }: { name: string } & LucideProps) => {
    const Icon = (LucideIcons as Record<string, any>)[name];
    if (!Icon) return <LucideIcons.CircleDashed {...props} />; // fallback
    return <Icon {...props} />;
};
export const ExpertiseGrid = () => {
    const { t: { about: { expertise: t } }, lang } = useLang()
    const { data, isLoading, isError } = useQuery<ExpertiseData>({
        queryKey: ['about-expertise', lang],
        queryFn: async () => {
            const response = await aboutService.getExpertise();
            if (!response.succeeded) throw new Error(response.error || "Failed to fetch expertise data");
            return response.data!;
        }
    });

    if (isLoading) return (
        <section className="mb-32">
            <div className="flex items-center justify-center py-24">
                <LoadingIndicator variant="dots" />
            </div>
        </section>
    );

    if (isError) return (
        <section className="mb-32">
            <div className="text-error font-body-md">{t.error}</div>
        </section>
    );


    const SkillTag = ({ tag }: { tag: string }) => (
        <span className="text-[11px] font-medium tracking-wide px-2 py-1 rounded
                         bg-surface-container border border-outline-variant/30
                         text-on-surface-variant">
            {tag}
        </span>
    );

    const SkillCard = ({ skill }: { skill: Skill }) => (
        <div className="glass-card p-8 flex flex-col gap-6 min-h-64">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high
                        flex items-center justify-center shrink-0">
                <DynamicIcon name={skill.icon} size={20} className="text-primary-fixed-dim" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-headline-md text-headline-md text-on-surface">{skill.title}</h3>
                <p className="text-on-surface-variant font-body-sm leading-relaxed">{skill.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {skill.tags.map(tag => <SkillTag key={tag} tag={tag} />)}
            </div>
        </div>
    );
    return (
        <section className="mb-32">
            {/* Header */}
            <div className="flex items-center justify-between mb-12 pb-4 kinetic-border">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    {t.technicalExpertise}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {data?.skills.map(skill => <SkillCard key={skill.category} skill={skill} />)}
            </div>
        </section>
    );
};
