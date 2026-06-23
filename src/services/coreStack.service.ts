import type { ApiResult, TechCardProps } from "../types/api";
import apiClient from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";
import { handleError } from "./helpers";

export const coreStackService = {
    async getCoreStackData(): Promise<ApiResult<TechCardProps[]>> {



        try {
            const response = await apiClient.get<ApiResult<TechCardProps[]>>(
                ENDPOINTS.CoreStack.GET_CORE_STACK,
            );
            return response.data;
        } catch (error) {
            return handleError<TechCardProps[]>(error, "Failed to fetch core stack data");
        }
    },
}