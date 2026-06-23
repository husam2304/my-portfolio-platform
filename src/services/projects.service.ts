import type { ApiResult, Project } from "../types/api";
import apiClient from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";
import { handleError } from "./helpers";

export const projectsService = {
    async getFeaturedProjects(): Promise<ApiResult<Project[]>> {


        try {
            const response = await apiClient.get<ApiResult<Project[]>>(
                ENDPOINTS.Projects.Get_FEATURED_PROJECTS
            );
            return response.data;

        } catch (error) {
            return handleError<Project[]>(error, "Failed to fetch featured projects");
        }
    },

    async getAllProjects(): Promise<ApiResult<Project[]>> {


        try {
            const response = await apiClient.get<ApiResult<Project[]>>(
                ENDPOINTS.Projects.GET_PROJECTS
            );
            return response.data;

        } catch (error) {
            return handleError<Project[]>(error, "Failed to fetch all projects");
        }
    },
};
