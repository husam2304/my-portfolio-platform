import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '../../../components/ui/LoadingIndicator';
import { resumeService } from '../../../services/resume.service';
import type { EducationData } from '../../../services/resume.service';
import { useLang } from '../../../context/Language/useLang';
import { GraduationCap } from 'lucide-react';

export const Education = () => {
    const { t: { resume: { education: t } } } = useLang();
    const { data, isLoading, isError } = useQuery<EducationData>({
        queryKey: ['education'],
        queryFn: async () => {
            const response = await resumeService.getEducation();
            if (!response.succeeded) {
                throw new Error(response.error || 'Failed to fetch education');
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
                <div className="text-error font-body-md text-body-md">{t.error}</div>
            </div>
        );

    return (
        <div className="space-y-6">
            <h3 className="font-label-caps text-primary-fixed-dim flex items-center gap-2">
                <GraduationCap size={16} />
                {t.label}
            </h3>
            <div className="space-y-4">
                {data?.education.map((edu) => (
                    <div key={edu.institution}>
                        <div className="font-label-caps text-on-surface">{edu.degree}</div>
                        <div className="font-code-sm text-on-surface-variant">
                            {edu.institution} • {edu.period}
                        </div>
                        {edu.focus && <div className="text-outline text-xs mt-1">{t.focus} {edu.focus}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};
