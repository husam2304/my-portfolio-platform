import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '../../../components/ui/LoadingIndicator';
import { contactService } from '../../../services/contact.service';
import type { ContactSpecsData } from '../../../services/contact.service';

export const ContactSpecs = () => {
    const { data, isLoading, isError } = useQuery<ContactSpecsData>({
        queryKey: ['contact-specs'],
        queryFn: async () => {
            const response = await contactService.getContactSpecs();
            if (!response.succeeded) {
                throw new Error(response.error || 'Failed to fetch contact specs');
            }
            return response.data!;
        },
    });

    if (isLoading)
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center justify-center py-12">
                    <LoadingIndicator variant="dots" />
                </div>
            </div>
        );

    if (isError) return null;

    return (
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {data?.specs.map((spec) => (
                <div key={spec.label} className="p-4 bg-surface-container-lowest border border-outline-variant/5">
                    <span className="font-label-caps text-label-caps text-primary-fixed-dim block mb-1">
                        {spec.label}
                    </span>
                    <span className="font-code-sm text-code-sm text-on-surface">{spec.value}</span>
                </div>
            ))}
        </div>
    );
};
