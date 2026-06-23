import { useQuery } from "@tanstack/react-query";
// import { Cloud, Database, Cpu, Network, Braces, Server } from "lucide-react";
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator";
import { useLang } from "../../../context/Language/useLang";
import type { TechCardProps } from "../../../types/api";
import { coreStackService } from "../../../services/coreStack.service";
import * as Icons from "lucide-react";



const TechCard = ({ icon, name }: TechCardProps) => {
    const IconComponent = Icons[icon as keyof typeof Icons];

    return (
        <div className="glass-card min-w-1/6 p-6 flex flex-col items-center justify-center gap-4 group">
            {IconComponent && (

                <IconComponent
                    size={48}
                    className="group-hover:scale-110 transition-transform duration-300"
                />
            )}

            <span className="font-label-caps text-label-caps text-on-surface-variant">
                {name}
            </span>
        </div>
    );
};
export const CoreStack = () => {
    const { t: { home: { CoreStack: t } } } = useLang();

    const { data, isLoading, isError } = useQuery<TechCardProps[]>({
        queryKey: ['corestack'],
        queryFn: async () => {
            // Simulate an API call
            const response = await coreStackService.getCoreStackData();

            if (!response.succeeded) {
                throw new Error(response.error || "Failed to fetch hero data");
            }
            return response.data!;

        }
    });

    if (isLoading)
        return (
            <section className="relative py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                <LoadingIndicator variant="dots" />
            </section>
        )
    if (isError)
        return (
            <section className="relative py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                <div className="text-error font-body-md text-body-md">{t.error}</div>
            </section>
        )
    return (
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2 tracking-tight">
                        {t.header}
                    </h2>
                    <p className="font-code-sm text-code-sm text-primary-fixed-dim uppercase">
                        {t.subheader}
                    </p>
                </div>
                <div className="h-px grow bg-outline-variant/20 mx-8 hidden md:block"></div>

            </div>

            {/* Tech Grid */}
            <div className="flex min-h-50 gap-6 overflow-x-scroll  scrollbar-thin scrollbar-thumb-outline-variant/20 scrollbar-track-transparent">
                {data?.map((tech) => (
                    <TechCard key={tech.id} icon={tech.icon} name={tech.name} id={tech.id} />
                ))}
            </div>
        </section>
    );
};
