import type { ApiResult, HeroSectionData } from "../types/api";
import apiClient from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";
import { handleError } from "./helpers";

export const homeService = {
    async getHeroData(): Promise<ApiResult<HeroSectionData>> {


        try {
            const response = await apiClient.get<ApiResult<HeroSectionData>>(
                ENDPOINTS.HOME.HERO,
            );
            return response.data;
        } catch (error) {
            return handleError<HeroSectionData>(error, "Failed to fetch hero data");
        }
    },

}