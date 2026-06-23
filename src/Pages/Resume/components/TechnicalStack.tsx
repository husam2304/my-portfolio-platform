import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '../../../components/ui/LoadingIndicator';
import { resumeService } from '../../../services/resume.service';
import type { TechStackData } from '../../../services/resume.service';
import { useLang } from '../../../context/Language/useLang';

export const TechnicalStack = () => {
    const { t: { resume: { technicalStack: t } } } = useLang();
    const { data, isLoading, isError } = useQuery<TechStackData>({
        queryKey: ['tech-stack'],
        queryFn: async () => {
            const response = await resumeService.getTechStack();
            if (!response.succeeded) {
                throw new Error(response.error || 'Failed to fetch tech stack');
            }
            return response.data!;
        },
    });

    if (isLoading)
        return (
            <div className="glass-panel p-8 rounded-lg space-y-6">
                <div className="flex items-center justify-center py-12">
                    <LoadingIndicator variant="dots" />
                </div>
            </div>
        );

    if (isError)
        return (
            <div className="glass-panel p-8 rounded-lg">
                <div className="text-error font-body-md text-body-md">{t.error}</div>
            </div>
        );

    return (
        <div className="glass-panel p-8 rounded-lg space-y-6">
            <h3 className="font-label-caps text-primary-fixed-dim">{t.label}</h3>
            <div className="grid grid-cols-2 gap-4">
                {data?.items.map((item) => (
                    <div key={item.category} className="p-4 bg-surface-container-high rounded-sm">
                        <span className="font-label-caps text-[10px] text-outline block mb-2">
                            {item.category}
                        </span>
                        <div className="font-code-sm text-primary-fixed">{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
