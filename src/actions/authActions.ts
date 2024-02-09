"use server";

import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";

import config from "@/config/config";
import { encrypt, decrypt } from "@/utils/cryptoUtils";

export async function authenticate(cedula: string, password: string) {
    try {
        const response = await axios.post(`${config.apiUrl}auth/login`, {
            userId: cedula,
            password,
        });

        const encryptedSessionData = encrypt(JSON.stringify(response.data));

        cookies().set("session", encryptedSessionData, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // One week
            path: "/",
        });

        return { status: response.status, message: response.data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.response?.data.message);
            // 👇️ error: AxiosError<any, any>
            return {
                status: error.response?.status,
                message: error.response?.data.message,
            };
        }
    }
}

export async function getSession() {
    const encryptedSessionData = cookies().get("session")?.value;

    return encryptedSessionData ? JSON.parse(decrypt(encryptedSessionData as string) || "") : null;
}
