import axios from "axios";
import { getToken } from "../utils/token";
import { Log } from "../utils/logger";

const api = axios.create({
    baseURL: "http://4.224.186.213/evaluation-service",
    headers: {
        "Content-Type": "application/json"
    }
});

// Request Interceptor
api.interceptors.request.use(

    async (config) => {

        // Attach latest token
        config.headers.Authorization = `Bearer ${getToken()}`;

        // Don't log the logging API itself
        if (!config.url.includes("/logs")) {

            await Log(
                "frontend",
                "info",
                "api",
                `${config.method.toUpperCase()} ${config.url}`
            );

        }

        return config;
    },

    async (error) => {

        if (!error.config?.url?.includes("/logs")) {

            await Log(
                "frontend",
                "error",
                "api",
                error.message
            );

        }

        return Promise.reject(error);

    }

);

// Response Interceptor
api.interceptors.response.use(

    (response) => response,

    async (error) => {

        if (!error.config?.url?.includes("/logs")) {

            await Log(
                "frontend",
                "error",
                "api",
                error.response?.data?.message || error.message
            );

        }

        return Promise.reject(error);

    }

);

export default api;