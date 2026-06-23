import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '../../../components/ui/LoadingIndicator';
import { resumeService } from '../../../services/resume.service';
import type { PublicationsData } from '../../../services/resume.service';
import { useLang } from '../../../context/Language/useLang';

export const Publications = () => {
    const { t: { resume: { publications: t } } } = useLang();
    const { data, isLoading, isError } = useQuery<PublicationsData>({
        queryKey: ['publications'],
        queryFn: async () => {
            const response = await resumeService.getPublications();
            if (!response.succeeded) {
                throw new Error(response.error || 'Failed to fetch publications');
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
        <section className="mt-24">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">{t.label}</h2>
                <div className="h-px grow bg-outline-variant/30"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data?.publications.map((pub) => (
                    <div
                        key={pub.id}
                        className="glass-panel p-6 rounded-lg kinetic-border cursor-pointer transition-transform hover:-translate-y-1"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span
                                className="material-symbols-outlined text-primary-fixed-dim"
                                data-icon={pub.icon}
                            >
                                {pub.icon}
                            </span>
                            <span className="font-code-sm text-outline text-xs">{pub.source}</span>
                        </div>
                        <h4 className="font-label-caps text-on-surface mb-2">{pub.title}</h4>
                        <p className="text-xs text-on-surface-variant">{pub.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
