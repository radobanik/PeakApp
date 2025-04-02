export const env = {
    API_URL: import.meta.env.VITE_SERVER_URI,
    API_PREFIX: import.meta.env.VITE_API_PREFIX,
    API_VERSION: import.meta.env.VITE_API_VERSION,
};

export const API_BASE_URL = `${env.API_URL}/${env.API_PREFIX}/${env.API_VERSION}`;
