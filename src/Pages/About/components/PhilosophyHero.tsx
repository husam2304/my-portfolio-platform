import { useQuery } from "@tanstack/react-query";
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator";
import { aboutService } from "../../../services/about.service";
import type { PhilosophyData } from "../../../services/about.service";
import { useLang } from "../../../context/Language/useLang";

export const PhilosophyHero = () => {
    const { t: { about: { philosophy: t } }, lang } = useLang()
    const { data, isLoading, isError } = useQuery<PhilosophyData>({
        queryKey: ['about-philosophy', lang],
        queryFn: async () => {
            const response = await aboutService.getPhilosophy();
            if (!response.succeeded) {
                throw new Error(response.error || "Failed to fetch philosophy data");
            }
            return response.data!;
        }
    });

    if (isLoading)
        return (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 items-end">
                <div className="col-span-full flex items-center justify-center py-24">
                    <LoadingIndicator variant="dots" />
                </div>
            </section>
        );

    if (isError)
        return (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 items-end">
                <div className="col-span-full text-error font-body-md">{t.error}</div>
            </section>
        );

    return (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 items-end">
            <div className="md:col-span-8">
                <span className="font-label-caps text-label-caps text-primary-fixed-dim block mb-4">
                    {data?.label}
                </span>
                <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary-fixed-dim mb-8">
                    {data?.title}
                </h1>
                <p className="text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                    {data?.description}
                </p>
            </div>
            <div className="md:col-span-4 flex justify-end">
                <div className="w-full aspect-square glass-card relative overflow-hidden group">
                    <img
                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                        alt={"My Hero Image"}
                        src={data?.imageUrl || ''} />
                    <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-60"></div>
                </div>
            </div>
        </section>
    );
};
