import { Download, LoaderCircle } from 'lucide-react';
import { useLang } from '../../../context/Language/useLang';
import { useMutation, useQuery } from '@tanstack/react-query';
import { resumeService } from '../../../services/resume.service';
import { LoadingIndicator } from '../../../components/ui/LoadingIndicator';
import { homeService } from '../../../services/home.service';

export const ResumeHeader = () => {
    const { t } = useLang();
    const resumeText = t.resume || {};
    const { data, isLoading, isError } = useQuery({
        queryKey: ['Objective'],
        queryFn: async () => {
            const response = await homeService.getHeroData();
            if (!response.succeeded) {
                throw new Error(response.error || 'Failed to fetch publications');
            }
            return response.data!;
        },
    });
    const downloadMutation = useMutation({
        mutationFn: () => resumeService.downloadResume(),

        onSuccess: (resumeBlob) => {
            const fileUrl = URL.createObjectURL(resumeBlob);

            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = 'Husam_Elayyan_Resume.pdf';

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(fileUrl);
        },

        onError: (error) => {
            console.error('Resume download failed:', error);
        },
    });

    const handleDownload = () => {
        if (!downloadMutation.isPending) {
            downloadMutation.mutate();
        }
    };
    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-96">
                <LoadingIndicator variant="dots" />
            </div>
        );

    if (isError)
        return (
            <div className="text-error font-body-md text-body-md">{resumeText.errorLoadingExperience}</div>
        );


    return (
        <section className="mb-24 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-2xl">
                <span className="text-primary-fixed-dim font-label-caps mb-4 block">
                    {resumeText.curriculumVitae || 'CURRICULUM VITAE'}
                </span>

                <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-6">
                    {data?.title || 'Technical Experience Architect'}
                </h1>

                <p className="text-on-surface-variant max-w-xl">
                    {data?.description ||
                        'Specializing in high-performance distributed systems and immersive UI architecture. Bridging the gap between robust backend logic and fluid user interaction.'}
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <button
                    type="button"
                    onClick={handleDownload}
                    disabled={downloadMutation.isPending}
                    className="bg-primary-fixed-dim text-on-primary-fixed font-label-caps group flex items-center gap-3 px-6 py-4 transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {downloadMutation.isPending ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <Download />
                    )}

                    {downloadMutation.isPending
                        ? resumeText.downloading || 'Downloading...'
                        : resumeText.downloadPdf || 'Download PDF Resume'}

                    {!downloadMutation.isPending && (
                        <div className="bg-on-primary-fixed ml-2 h-2 w-2 animate-pulse rounded-full" />
                    )}
                </button>

                {downloadMutation.isError && (
                    <p className="text-sm text-red-500">
                        {resumeText.downloadError ||
                            'Failed to download the resume.'}
                    </p>
                )}
            </div>
        </section>
    );
};