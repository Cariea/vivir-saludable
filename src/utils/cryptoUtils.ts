import config from "@/config/config";

import * as crypto from "crypto";

import * as CryptoJS from "crypto-js";

function splitEncryptedText(encryptedText: string) {
    return {
        ivString: encryptedText.slice(0, 32),
        encryptedDataString: encryptedText.slice(32),
    };
}

export function encrypt(plaintext: string) {
    try {
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(plaintext), config.encryptPassword).toString();
        const result = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function decrypt(cipherText: string) {
    const decData = CryptoJS.enc.Base64.parse(cipherText).toString(CryptoJS.enc.Utf8);
    const bytes = CryptoJS.AES.decrypt(decData, config.encryptPassword).toString(CryptoJS.enc.Utf8);
    return JSON.parse(bytes);
}
