import axios from "axios";
import { Log } from "../../../logging-middleware";
import { getToken } from "../../../logging-middleware/src/utils/token";

const api = axios.create({
    baseURL: "http://4.224.186.213/evaluation-service",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(async (config) => {

    config.headers.Authorization = `Bearer ${getToken()}`;

    await Log(
        "frontend",
        "info",
        "api",
        `${config.method?.toUpperCase()} ${config.url}`
    );

    return config;
});

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        await Log(
            "frontend",
            "error",
            "api",
            error.message
        );

        return Promise.reject(error);
    }

);

export default api;