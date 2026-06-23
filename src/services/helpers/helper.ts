import type { ApiResult } from "../../types/api";

export function handleError<T>(error: unknown, defaultMessage: string): ApiResult<T> {
    let errorMessage = defaultMessage;

    if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === "object" && error !== null && "response" in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const axiosError = error as any;
        if (axiosError.response?.data?.error) {
            errorMessage = axiosError.response.data.error;
        } else if (axiosError.response?.statusText) {
            errorMessage = axiosError.response.statusText;
        }
    }

    console.error(`[authService] ${defaultMessage}:`, error);

    return {
        succeeded: false,
        data: null,
        error: errorMessage,
    };
}