import { useState } from 'react';
import { useLang } from '../../../context/Language/useLang';
import { Search } from 'lucide-react';

interface FilterState {
    search: string;
    selectedStack: string[];
}

interface ProjectsFilterProps {
    onFilterChange?: (filters: FilterState) => void;
}

export const ProjectsFilter = ({ onFilterChange }: ProjectsFilterProps) => {
    const { t } = useLang();
    const projectsText = t.projects || {};

    const [filters, setFilters] = useState<FilterState>({
        search: '',
        selectedStack: [],
    });

    const stacks = ['ALL_FILES', 'TYPESCRIPT', 'PYTHON', 'RUST', 'WEBGL'];

    const handleSearchChange = (value: string) => {
        const newFilters = { ...filters, search: value };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const toggleStack = (stack: string) => {
        const newStack = filters.selectedStack.includes(stack)
            ? filters.selectedStack.filter(s => s !== stack)
            : [...filters.selectedStack, stack];
        const newFilters = { ...filters, selectedStack: newStack };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    return (
        <section className="mb-12 flex flex-col md:flex-row gap-6 items-end md:items-center">
            <div className="relative w-full md:w-96 group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="text-outline" />
                </div>
                <input
                    type="text"
                    placeholder={projectsText.queryPlaceholder || 'QUERY_RESOURCES...'}
                    value={filters.search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full bg-surface-container-low border-b border-outline-variant focus:border-primary-fixed-dim focus:ring-0 text-on-surface font-code-sm pl-12 pr-4 py-3 transition-all duration-300"
                />
            </div>
            <div className="flex flex-wrap gap-2 w-full justify-start md:justify-end">
                {stacks.map((stack) => (
                    <button
                        key={stack}
                        onClick={() => toggleStack(stack)}
                        className={`px-4 py-1 border font-label-caps text-label-caps transition-colors ${filters.selectedStack.includes(stack) || stack === 'ALL_FILES'
                            ? 'border-primary-fixed-dim text-primary-fixed-dim hover:bg-primary-fixed-dim/10'
                            : 'border-outline-variant text-on-surface-variant hover:border-on-surface'
                            }`}
                    >
                        {stack}
                    </button>
                ))}
            </div>
        </section>
    );
};
