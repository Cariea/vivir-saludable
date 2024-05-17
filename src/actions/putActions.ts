'use server'

import axios from "axios";

import { NewUserInput } from "@/types";
import config from "@/config/config";
import { getSession } from "@/actions/authActions";

export async function updateUser(newUser: NewUserInput) {
    try {
        const session = await getSession();

        let url;
        if (newUser.role === "specialist") {
            url = `${config.apiUrl}specialists/${newUser.userId}`;
        } else {
            url = `${config.apiUrl}pacients/${newUser.userId}`;
        }

        const response = await axios.put(url, newUser, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        });

        return {
            status: response.status,
            data: response.data,
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
            message: "Internal Server Error",
        };
    }
}

export async function updateDailyAssigmentStatus(recordId: number,status: boolean) {
    try {
        const session = await getSession();

        const response = await axios.put(`${config.apiUrl}daily-assignments/${recordId}`, {completed: status}, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        });
        return {
            status: response.status,
            data: response.data,
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
            message: "Internal Server Error",
        };
    }
}

export const updateStatusAlert = async (alertId: number) => {
    try {
        const session = await getSession();

        const response = await axios.put(`${config.apiUrl}alerts/${alertId}`, {}, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        });

        return {
            status: response.status,
            data: response.data,
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
            message: "Internal Server Error",
        };
    }
}

export const darAlta = async (userId: string) => {
    try {
        const session = await getSession();

        const response = await axios.put(`${config.apiUrl}linker/alta`, {}, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                pacientId: userId,
            },
        });

        return {
            status: response.status,
            data: response.data,
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
            message: "Internal Server Error",
        };
    }
}