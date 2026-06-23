import type { ApiResult } from "../types/api";
import apiClient from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";
import { handleError } from "./helpers";

export type SocialLink = {
    id: string;
    name: string;
    handle: string;
    url: string;
    icon: string;
};

export type SocialLinksData = {
    links: SocialLink[];
};

export type ContactFormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export type ContactResponse = {
    success: boolean;
    message: string;
};

export type ContactSpec = {
    label: string;
    value: string;
};

export type ContactSpecsData = {
    specs: ContactSpec[];
};

export const contactService = {
    async getSocialLinks(): Promise<ApiResult<SocialLinksData>> {


        try {
            const response = await apiClient.get<ApiResult<SocialLinksData>>(
                ENDPOINTS.Contact?.GET_SOCIAL_LINKS || ""
            );
            return response.data;
        } catch (error) {
            return handleError<SocialLinksData>(error, "Failed to fetch social links");
        }
    },

    async getContactSpecs(): Promise<ApiResult<ContactSpecsData>> {


        try {
            const response = await apiClient.get<ApiResult<ContactSpecsData>>(
                ENDPOINTS.Contact?.GET_SPECS || ""
            );
            return response.data;
        } catch (error) {
            return handleError<ContactSpecsData>(error, "Failed to fetch contact specs");
        }
    },

    async submitContactForm(data: ContactFormData): Promise<ApiResult<ContactResponse>> {


        try {
            const response = await apiClient.post<ApiResult<ContactResponse>>(
                ENDPOINTS.Contact?.SUBMIT_FORM || "",
                data
            );
            return response.data;
        } catch (error) {
            return handleError<ContactResponse>(error, "Failed to submit form");
        }
    },
};
