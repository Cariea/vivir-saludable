import config from "@/config/config";

import * as crypto from "crypto";

function splitEncryptedText(encryptedText: string) {
    return {
        ivString: encryptedText.slice(0, 32),
        encryptedDataString: encryptedText.slice(32),
    };
}

export function encrypt(plaintext: string) {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-256-cbc", config.encryptPassword, iv);

        const encrypted = Buffer.concat([
            cipher.update(JSON.stringify(plaintext), "utf-8"),
            cipher.final(),
        ]);

        return iv.toString("hex") + encrypted.toString("hex");
    } catch (error) {
        throw error;
    }
}

export function decrypt(cipherText: string) {
    const { encryptedDataString, ivString } = splitEncryptedText(cipherText);

    try {
        const iv = Buffer.from(ivString, "hex");
        const encryptedText = Buffer.from(encryptedDataString, "hex");

        const decipher = crypto.createDecipheriv("aes-256-cbc", config.encryptPassword, iv);

        const decrypted = decipher.update(encryptedText);
        return Buffer.concat([decrypted, decipher.final()]).toString();
    } catch (e) {
        console.error(e);
    }
}
