import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '../../../components/ui/LoadingIndicator';
import { resumeService } from '../../../services/resume.service';
import type { ExperienceData } from '../../../services/resume.service';
import { ChevronRight } from 'lucide-react';
import { useLang } from '../../../context/Language/useLang';

export const Experience = () => {
    const { t: { resume: { experience: t } } } = useLang();
    const { data, isLoading, isError } = useQuery<ExperienceData>({
        queryKey: ['experience'],
        queryFn: async () => {
            const response = await resumeService.getExperience();
            if (!response.succeeded) {
                throw new Error(response.error || 'Failed to fetch experience');
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
            <div className="text-error font-body-md text-body-md">{t.error}</div>
        );

    return (
        <section>
            <div className="flex items-center gap-4 mb-12">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">{t.label}</h2>
                <div className="h-px grow bg-outline-variant/30"></div>
            </div>
            <div className="relative pl-8 md:pl-12 space-y-16">
                {/* Vertical Line */}
                <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-outline-variant/30"></div>

                {data?.experience.map((exp) => (
                    <div key={exp.id} className="relative scroll-reveal">
                        {/* Timeline Dot */}
                        <div
                            className={`absolute -left-10 md:-left-14 top-1 w-4 h-4 rounded-full border-4 border-background z-10 ${exp.isCurrent
                                ? 'bg-primary-fixed-dim animate-pulse'
                                : 'bg-outline-variant'
                                }`}
                        ></div>

                        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                            <h3 className={`font-headline-lg text-2xl ${exp.isCurrent ? 'text-primary-fixed-dim' : 'text-on-surface'}`}>
                                {exp.title}
                            </h3>
                            <span className="font-code-sm text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-sm">
                                {exp.period}
                            </span>
                        </div>

                        <div className="font-label-caps text-on-surface mb-6 tracking-wide">
                            {exp.company} • {exp.employmentType.toUpperCase()}
                        </div>

                        <div
                            className={`p-6 rounded-lg mb-6 border-l-4 ${exp.isCurrent
                                ? 'glass-panel border-primary-fixed-dim'
                                : 'border-outline-variant/50'
                                }`}
                        >
                            <p className="text-on-surface mb-4 leading-relaxed">{exp.description}</p>
                            {exp.achievements.length > 0 && (
                                <ul className="space-y-3">
                                    {exp.achievements.map((achievement) => (
                                        <li
                                            key={achievement}
                                            className="flex items-start gap-3 text-on-surface-variant text-sm"
                                        >
                                            <ChevronRight
                                                className={`material-symbols-outlined mt-0.5 ${exp.isCurrent
                                                    ? 'text-primary-fixed-dim'
                                                    : 'text-outline'
                                                    }`} />
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {exp.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-code-sm bg-surface-container px-2 py-1 border border-outline-variant/30 text-outline"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
