import axios from "axios";
import { getToken } from "../utils/token";

const logClient = axios.create({
    baseURL: "http://4.224.186.213/evaluation-service",
    headers: {
        "Content-Type": "application/json"
    }
});

export async function sendLog(body) {

    try {

        const response = await logClient.post(
            "/logs",
            body,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );

        return response.data;

    } catch (error) {

        // Never call Log() here, otherwise it creates recursion.
        // Never use console.log() as per evaluation.
        return null;

    }

}