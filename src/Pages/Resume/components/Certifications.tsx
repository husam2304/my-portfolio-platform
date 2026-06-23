import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '../../../components/ui/LoadingIndicator';
import { resumeService } from '../../../services/resume.service';
import type { CertificationsData } from '../../../services/resume.service';
import { useLang } from '../../../context/Language/useLang';
import { BadgeCheck } from 'lucide-react';

export const Certifications = () => {
    const { t: { resume: { certifications: t } } } = useLang();
    const { data, isLoading, isError } = useQuery<CertificationsData>({
        queryKey: ['certifications'],
        queryFn: async () => {
            const response = await resumeService.getCertifications();
            if (!response.succeeded) {
                throw new Error(response.error || 'Failed to fetch certifications');
            }
            return response.data!;
        },
    });

    if (isLoading)
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-center py-12">
                    <LoadingIndicator variant="dots" />
                </div>
            </div>
        );

    if (isError)
        return (
            <div className="space-y-6">
                <div className="text-error font-body-md text-body-md">{t.error || 'Error loading certifications'}</div>
            </div>
        );

    return (
        <div className="space-y-6">
            <h3 className="font-label-caps text-primary-fixed-dim flex items-center gap-2">
                <BadgeCheck className="w-4 h-4" />
                {t.label}
            </h3>
            <div className="space-y-4">
                {data?.certifications.map((cert) => (
                    <div key={cert.title} className="group border-l-2 border-outline-variant pl-4 py-1 hover:border-primary-fixed-dim transition-colors">
                        <div className="font-label-caps text-on-surface">{cert.title}</div>
                        <div className="font-code-sm text-on-surface-variant">
                            {cert.level} • {cert.year}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
