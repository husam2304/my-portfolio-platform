import { useQuery } from "@tanstack/react-query";
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator";
import { aboutService } from "../../../services/about.service";
import type { JourneyData } from "../../../services/about.service";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../../../context/Language/useLang";

export const JourneyTimeline = () => {
    const { t: { about: { journey: t } }, lang } = useLang()
    const { data, isLoading, isError } = useQuery<JourneyData>({
        queryKey: ['about-journey', lang],
        queryFn: async () => {
            const response = await aboutService.getJourney();
            if (!response.succeeded) {
                throw new Error(response.error || "Failed to fetch journey data");
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

    return (
        <section className="mb-32">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-12 text-center">Runtime Journey</h2>
            <div className="space-y-4">
                {data?.items.map((item) => (
                    <div
                        key={item.period}
                        className={`grid grid-cols-1 md:grid-cols-12 glass-card p-6 items-center ${item.highlighted ? 'border-l-4 border-primary-fixed-dim' : ''
                            }`}
                    >
                        <div className="md:col-span-2 font-code-sm text-primary-fixed-dim">{item.period}</div>
                        <div className="md:col-span-4 font-headline-lg text-on-surface">{item.position}</div>
                        <div className="md:col-span-3 text-on-surface-variant italic">{item.company}</div>
                        <div className="md:col-span-3 flex items-center justify-end ">
                            <ArrowUpRight className="text-outline" />                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
