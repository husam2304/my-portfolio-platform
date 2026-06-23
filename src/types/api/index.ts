export type HeroSectionData = {
    title: string;
    description: string;
};

export type TechCardProps = {
    id: number;
    icon: string;
    name: string;
};

export type Project = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    isFeatured: boolean;
    tags: string[];
};

export type FeaturedProjectsData = {
    projects: Project[];
};

export type LabExperiment = {
    id: string;
    title: string;
    description: string;
    cpuUsage: number;
    networkUsage: number;
};

export type LabExperimentsData = {
    experiment: LabExperiment;
};

export interface ApiResult<T> {
    succeeded: boolean;
    data: T | null;
    error: string | null;
}