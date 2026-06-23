import { useQuery } from "@tanstack/react-query";
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator";
import { useLang } from "../../../context/Language/useLang";
import type { HeroSectionData } from "../../../types/api";
import { homeService } from "../../../services/home.service";


export const HeroSection = () => {
    const { t: { home: { heroSection: t } }, lang } = useLang();
    const { data, isLoading, isError } = useQuery<HeroSectionData>({
        queryKey: ['herosection', lang],
        queryFn: async () => {
            const response = await homeService.getHeroData();
            if (!response.succeeded) {
                throw new Error(response.error || "Failed to fetch hero data");
            }
            return response.data!;
        }

    });

    if (isLoading)
        return (
            <section className="relative  min-h-230.25 flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop kinetic-grid">
                <LoadingIndicator variant="dots" />
            </section>
        )

    if (isError)
        return (
            <section className="relative  min-h-230.25 flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop kinetic-grid">
                <div className="text-error font-body-md text-body-md">{t.error}</div>
            </section>
        )
    return (
        <section className="relative min-h-230.25 flex items-center overflow-hidden px-margin-mobile md:px-margin-desktop kinetic-grid">
            {/* Kinetic background effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {/* Using webgl-shader for kinetic background effect */}
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-4xl">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-primary-fixed-dim/20 bg-primary-fixed-dim/5">
                    <span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse"></span>
                    <span className="font-code-sm text-code-sm text-primary-fixed-dim uppercase tracking-widest">
                        {t.statusBadge}
                    </span>
                </div>

                {/* Heading */}
                <h1
                    className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-6 text-on-surface tracking-tight terminal-cursor"
                    id="terminal-intro"
                >
                    {data?.title || "High-Performance Systems Architect"}
                </h1>

                {/* Description */}
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
                    {data?.description || "Architecting high-performance distributed systems with a focus on low-latency execution and creative interface design. Bridging the gap between industrial-grade engineering and human-centric experiences."}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">

                    <button className="border border-outline-variant px-8 py-4 font-label-caps text-label-caps font-bold rounded-lg hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-all active:scale-95">
                        {t.viewSourceCode}
                    </button>
                </div>
            </div>
        </section>
    );
};
