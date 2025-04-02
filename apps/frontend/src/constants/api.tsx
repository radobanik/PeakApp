import { API_BASE_URL } from "@/lib/env";

export const API = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
        LOGOUT: `${API_BASE_URL}/auth/logout`,
    },
    USER: {
        PROFILE: `${API_BASE_URL}/users/profile`,
        UPDATE: `${API_BASE_URL}/users/update`,
    }
};