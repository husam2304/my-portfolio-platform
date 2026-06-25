import type { ApiResult } from "../types/api";
import apiClient from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";
import { handleError } from "./helpers";

export type ProjectMeta = {
    client: string;
    techStack: string;
    timeline: string;
};

export type CodeHighlight = {
    id: string;
    title: string;
    description: string;
    icon: string;
};

export type ProjectDetails = {
    id: string;
    caseStudyLabel: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    meta: ProjectMeta;
    overviewTitle: string;
    overviewDescription: string;
    architectureElements: {
        name: string;
        label: string;
        description: string;
        icon: string;
    }[];
    codeHighlights: CodeHighlight[];
    codeSnippet: string;
    isFeatured: boolean;
    sortOrder: number;
    tags: string[];
    media?: ProjectMediaDto[];
    viewLink?: string;
    githubLink?: string;
    websiteLink?: string;
    appLink?: string;
};

export type ProjectMediaDto = {
    url: string;
    type: ProjectMediaType;
};
export const ProjectMediaType = {
    Video: 0,
    Image: 1,
    Audio: 2,
    Docs: 3,
} as const;

export type ProjectMediaType =
    typeof ProjectMediaType[keyof typeof ProjectMediaType];


export type ProjectDetailsData = {
    project: ProjectDetails;
};

export const projectDetailsService = {
    async getProjectDetails(projectId: string): Promise<ApiResult<ProjectDetails>> {


        try {
            const response = await apiClient.get<ApiResult<ProjectDetails>>(
                `${ENDPOINTS.Projects.Get_PROJECT_BY_ID(projectId)}`
            );
            return response.data;
        } catch (error) {
            return handleError<ProjectDetails>(error, "Failed to fetch project details");
        }
    },
};
