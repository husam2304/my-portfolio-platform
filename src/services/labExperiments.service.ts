import type { ApiResult, LabExperiment } from "../types/api";
import apiClient from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";
import { handleError } from "./helpers";

export const labExperimentsService = {
    async getExperiments(): Promise<ApiResult<LabExperiment>> {


        try {
            const response = await apiClient.get<ApiResult<LabExperiment>>(
                ENDPOINTS.LabExperiments.GET_EXPERIMENTS
            );
            return response.data;
        } catch (error) {
            return handleError<LabExperiment>(error, "Failed to fetch lab experiments");
        }
    },
};
