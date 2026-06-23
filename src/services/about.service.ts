import type { ApiResult } from "../types/api";
import apiClient from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";
import { handleError } from "./helpers";

export type PhilosophyData = {
    label: string;
    title: string;
    description: string;
    imageUrl: string;
};

export type Skill = {
    id: number;
    category: string;
    title: string;
    description: string;
    tags: string[];
    icon: string;
};

export type ExpertiseData = {
    skills: Skill[];
};

export type JourneyItem = {
    period: string;
    position: string;
    company: string;
    highlighted: boolean;
};

export type JourneyData = {
    items: JourneyItem[];
};

export const aboutService = {
    async getPhilosophy(): Promise<ApiResult<PhilosophyData>> {
        // Mock data for demo - remove when API is ready

        try {
            const response = await apiClient.get<ApiResult<PhilosophyData>>(
                ENDPOINTS.About.GET_PHILOSOPHY
            );
            return response.data;
        } catch (error) {
            return handleError<PhilosophyData>(error, "Failed to fetch philosophy data");
        }
    },

    async getExpertise(): Promise<ApiResult<ExpertiseData>> {


        try {
            const response = await apiClient.get<ApiResult<ExpertiseData>>(
                ENDPOINTS.About.GET_EXPERTISE
            );
            return response.data;
        } catch (error) {
            return handleError<ExpertiseData>(error, "Failed to fetch expertise data");
        }
    },

    async getJourney(): Promise<ApiResult<JourneyData>> {
        // Mock data for demo - remove when API is ready


        try {
            const response = await apiClient.get<ApiResult<JourneyData>>(
                ENDPOINTS.About.GET_JOURNEY
            );
            return response.data;
        } catch (error) {
            return handleError<JourneyData>(error, "Failed to fetch journey data");
        }
    },
};
