'use server'

import axios from "axios";

import { getSession } from "@/actions/authActions";
import config from "@/config/config";
import { NewUserInput } from "@/types";


export async function createUser(newUser: NewUserInput) {
    try {
        const session = await getSession();
        const response = await axios.post(`${config.apiUrl}users/register`, newUser, {
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

export async function postSpecialistPacientLink(pacientId: string, specialistId: string) {
    try {
        const session = await getSession();
        const response = await axios.post(`${config.apiUrl}linker/add`, {
            pacientId,
            specialistId
        }, {
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