import type { ApiResult } from "../types/api";
import apiClient from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";
import { handleError } from "./helpers";

export type TechStackItem = {
    category: string;
    value: string;
};

export type TechStackData = {
    items: TechStackItem[];
};

export type Certification = {
    title: string;
    level: string;
    year: number;
};

export type CertificationsData = {
    certifications: Certification[];
};

export type EducationItem = {
    degree: string;
    institution: string;
    period: string;
    focus?: string;
};

export type EducationData = {
    education: EducationItem[];
};

export type ExperienceItem = {
    id: string;
    title: string;
    company: string;
    employmentType: string;
    period: string;
    description: string;
    achievements: string[];
    tags: string[];
    isCurrent: boolean;
};

export type ExperienceData = {
    experience: ExperienceItem[];
};

export type Publication = {
    id: string;
    title: string;
    description: string;
    source: string;
    date: string;
    icon: string;
};

export type PublicationsData = {
    publications: Publication[];
};


export const resumeService = {
    async getTechStack(): Promise<ApiResult<TechStackData>> {

        try {
            const response = await apiClient.get<ApiResult<TechStackData>>(
                ENDPOINTS.Resume?.GET_TECH_STACK || ""
            );
            return response.data;
        } catch (error) {
            return handleError<TechStackData>(error, "Failed to fetch tech stack");
        }
    },

    async getCertifications(): Promise<ApiResult<CertificationsData>> {


        try {
            const response = await apiClient.get<ApiResult<CertificationsData>>(
                ENDPOINTS.Resume?.GET_CERTIFICATIONS || ""
            );
            return response.data;
        } catch (error) {
            return handleError<CertificationsData>(error, "Failed to fetch certifications");
        }
    },

    async getEducation(): Promise<ApiResult<EducationData>> {


        try {
            const response = await apiClient.get<ApiResult<EducationData>>(
                ENDPOINTS.Resume?.GET_EDUCATION || ""
            );
            return response.data;
        } catch (error) {
            return handleError<EducationData>(error, "Failed to fetch education");
        }
    },

    async getExperience(): Promise<ApiResult<ExperienceData>> {


        try {
            const response = await apiClient.get<ApiResult<ExperienceData>>(
                ENDPOINTS.Resume?.GET_EXPERIENCE || ""
            );
            return response.data;
        } catch (error) {
            throw handleError<ExperienceData>(error, "Failed to fetch experience");
        }
    },

    async getPublications(): Promise<ApiResult<PublicationsData>> {


        try {
            const response = await apiClient.get<ApiResult<PublicationsData>>(
                ENDPOINTS.Resume?.GET_PUBLICATIONS || ""
            );
            return response.data;
        } catch (error) {
            return handleError<PublicationsData>(error, "Failed to fetch publications");
        }
    },
    async downloadResume(): Promise<Blob> {
        try {
            const response = await apiClient.get<Blob>('/api/Resume/download', {
                responseType: 'blob',
            });

            return response.data;
        } catch (error) {
            throw new Error('Failed to download resume', { cause: error });
        }
    },

}
