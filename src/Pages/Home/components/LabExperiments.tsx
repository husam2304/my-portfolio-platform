import { useQuery } from "@tanstack/react-query";
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator";
import type { LabExperiment } from "../../../types/api";
import { labExperimentsService } from "../../../services/labExperiments.service";

export const LabExperiments = () => {
    const { data, isLoading, isError } = useQuery<LabExperiment>({
        queryKey: ['lab-experiments'],
        queryFn: async () => {
            const response = await labExperimentsService.getExperiments();
            if (!response.succeeded) {
                throw new Error(response.error || "Failed to fetch experiments");
            }
            return response.data!;
        }
    });

    if (isLoading)
        return (
            <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                <div className="flex items-center justify-center min-h-96">
                    <LoadingIndicator variant="dots" />
                </div>
            </section>
        );

    if (isError)
        return (
            <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                <div className="text-error font-body-md text-body-md">Error loading experiments</div>
            </section>
        );

    return (
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <div className="bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/20">
                {/* Terminal Header */}
                <div className="flex items-center justify-between bg-surface-variant/50 px-4 py-2 border-b border-outline-variant/20">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-error/50"></div>
                        <div className="w-3 h-3 rounded-full bg-primary-fixed-dim/50"></div>
                        <div className="w-3 h-3 rounded-full bg-outline/50"></div>
                    </div>
                    <div className="font-code-sm text-code-sm text-on-surface-variant opacity-60">{data?.id}.log</div>
                    <div className="material-symbols-outlined text-[16px] text-on-surface-variant">settings</div>
                </div>

                {/* Content Grid */}
                <div className="p-8 grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                            {data?.title}
                        </h2>
                        <p className="font-body-md text-on-surface-variant leading-relaxed">
                            {data?.description}
                        </p>

                        {/* Performance Metrics */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-primary-fixed-dim font-code-sm">CPU:</span>
                                <div className="h-2 grow bg-surface-variant rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary-fixed-dim animate-[pulse_2s_infinite]"
                                        style={{ width: `${data?.cpuUsage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-primary-fixed-dim font-code-sm">NET:</span>
                                <div className="h-2 grow bg-surface-variant rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary-fixed-dim animate-[pulse_3s_infinite]"
                                        style={{ width: `${data?.networkUsage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button className="flex items-center gap-2 text-primary-fixed-dim font-label-caps text-label-caps hover:gap-4 transition-all">
                            ENTER THE SANDBOX
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>

                    {/* Right Visualization Placeholder */}
                    <div className="relative h-64 md:h-96 bg-surface-container-lowest rounded-lg border border-outline-variant/10 overflow-hidden">
                        {/* Animated visualization area */}
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">
                                memory
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
