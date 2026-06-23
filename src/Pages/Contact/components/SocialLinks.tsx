import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '../../../components/ui/LoadingIndicator';
import { contactService } from '../../../services/contact.service';
import type { SocialLinksData } from '../../../services/contact.service';
import { useLang } from '../../../context/Language/useLang';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SocialLinks = () => {
    const { t } = useLang();
    const contactText = t.contact || {};

    const { data, isLoading, isError } = useQuery<SocialLinksData>({
        queryKey: ['social-links'],
        queryFn: async () => {
            const response = await contactService.getSocialLinks();
            if (!response.succeeded) {
                throw new Error(response.error || 'Failed to fetch social links');
            }
            return response.data!;
        },
    });

    if (isLoading)
        return (
            <div className="flex items-center justify-center py-12">
                <LoadingIndicator variant="dots" />
            </div>
        );

    if (isError)
        return (
            <div className="text-error font-body-md text-body-md">
                {contactText.error || 'Error loading social links'}
            </div>
        );

    return (
        <div className="space-y-8">
            <div>
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 opacity-50">
                    {contactText.socialProtocols || 'SOCIAL_PROTOCOLS'}
                </h3>
                <div className="flex flex-col gap-4">
                    {data?.links.map((link) => (
                        <Link
                            to={link.url}
                            key={link.id}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-4 border border-outline-variant/10 bg-surface-container-low hover:bg-surface-container-high transition-all"
                        >
                            <img
                                src={link.icon}
                                alt={link.name}
                                className="material-symbols-outlined text-primary-fixed-dim"
                            />
                            <div className="flex flex-col">
                                <span className="font-label-caps text-label-caps text-on-surface">
                                    {link.name}
                                </span>
                                <span className="font-code-sm text-code-sm text-on-surface-variant">
                                    {link.handle}
                                </span>
                            </div>

                            <ArrowUpRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Status Box */}
            <div className="p-6 border border-primary-fixed-dim/20 bg-primary-fixed-dim/5 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse"></span>
                    <span className="font-label-caps text-label-caps text-primary-fixed-dim">
                        {contactText.statusLabel || 'STATUS: READY_FOR_DEPLOYS'}
                    </span>
                </div>
                <p className="font-code-sm text-code-sm text-on-surface-variant">
                    {contactText.statusMessage || 'Currently reviewing opportunities for Q3-Q4 2024. Average response latency: < 24 hours.'}
                </p>
            </div>
        </div >
    );
};
