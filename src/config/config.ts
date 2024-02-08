import { CipherKey } from "crypto";

type Config = {
    apiUrl: string,
    encryptPassword: string
}


const config: Config = {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    encryptPassword: process.env.ENCRYPT_PASSWORD || "",
}

export default config;