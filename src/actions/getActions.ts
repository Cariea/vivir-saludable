'use server'

import axios from "axios";

import { getSession } from "@/actions/authActions";
import config from "@/config/config";

interface UserListParams {
    size: number;
    page: number;
}

export async function getSpecialties() {
    const session = JSON.parse(await getSession());

    try {
        const response = await axios.get(`${config.apiUrl}specialties`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                size: 100,
                page: 1
            }
        });

        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.response?.data.message);
            // 👇️ error: AxiosError<any, any>
            return {
                status: error.response?.status,
                message: error.response?.data.message,
            };
        }

        console.log("error: ", error);

        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
}

export async function getPrograms() {
    const session = JSON.parse(await getSession());

    try {
        const response = await axios.get(`${config.apiUrl}programs`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                size: 100,
                page: 1
            }
        });

        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.response?.data.message);
            // 👇️ error: AxiosError<any, any>
            return {
                status: error.response?.status,
                message: error.response?.data.message,
            };
        }

        console.log("error: ", error);

        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
}

export async function getUsers({ size, page }: UserListParams) {
    const session = JSON.parse(await getSession());

    try {
        const response = await axios.get(`${config.apiUrl}users`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: { size, page }
        });

        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.response?.data.message);
            // 👇️ error: AxiosError<any, any>
            return {
                status: error.response?.status,
                message: error.response?.data.message,
            };
        }

        console.log("error: ", error);

        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
}

export async function getUserInfo(userId: string) {
    const session = JSON.parse(await getSession());

    try {
        const response = await axios.get(`${config.apiUrl}users/${userId}`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            }
        });

        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.response?.data.message);
            // 👇️ error: AxiosError<any, any>
            return {
                status: error.response?.status,
                message: error.response?.data.message,
            };
        }

        console.log("error: ", error);

        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
}