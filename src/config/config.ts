type Config = {
    apiUrl: string,
    encryptPassword: string
}


const config: Config = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
    encryptPassword: process.env.NEXT_PUBLIC_ENCRYPT_PASSWORD || "",
}

export default config;