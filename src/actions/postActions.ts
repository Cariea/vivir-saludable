'use server'

import axios from "axios";

import { getSession } from "@/actions/authActions";
import config from "@/config/config";
import { NewUserInput } from "@/types";
import { Ingredient } from "@/components/pacient/nutricionist/Meals";
import sharp from "sharp";

export async function base64ToFile(base64String: string, fileName: string): Promise<File> {
    return new Promise((resolve, reject) => {
        const maxSizeInBytes = 1024 * 1024;
        const mimeType = "image/webp"; // Establecer el tipo MIME como image/webp

        // Obtener el contenido binario del base64
        const byteCharacters = atob(base64String.split(',')[1]);

        // Convertir el contenido binario a un array de bytes
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        let imageResized: Buffer | undefined; 

        const resizeImage = async () => {
            try {
                const resizedImageBuffer = await sharp(Buffer.from(byteArray))
                    .resize(300, 300)
                    .toBuffer();

                const fileSizeInBytes = resizedImageBuffer.length;

                if (fileSizeInBytes > maxSizeInBytes) {
       
                    await resizeImage();
                } else {
 
                    console.log("Tamaño de la imagen redimensionada: ", fileSizeInBytes);
                    imageResized = resizedImageBuffer;
                }
            } catch (error) {
                reject(error);
            }
        };


        resizeImage()
            .then(() => {
                if (imageResized) { 
                    const blob = new Blob([imageResized], { type: mimeType });

            
                    const file = new File([blob], fileName, { type: mimeType });

                    resolve(file);
                } else {
                    reject(new Error('No se pudo redimensionar la imagen.'));
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

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
export async function postPacientMeal(description: string, pica: boolean, wasSatisfied: boolean, mealImage: string,ingredients: Ingredient[], imageName: string) {
    try {
        const image = await base64ToFile(mealImage, imageName);

        const formData = new FormData();
        formData.append('description', description);
        formData.append('pica', pica.toString());
        formData.append('wasSatisfied', wasSatisfied.toString());
        formData.append('mealImage', image);
        formData.append('ingredients', JSON.stringify(ingredients));

        const session = await getSession();

        const response = await axios.post(`${config.apiUrl}meals/add`, formData, {
            headers: {
                Authorization: `Bearer ${session.token}`,
                'Content-Type': 'multipart/form-data', 
            },
        });

        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.response?.data.message);
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

export async function postSymptoms(symptom: string, description: string, when: string, specialist: string) {
    try {
        const session = await getSession();
        const response = await axios.post(`${config.apiUrl}symptoms/add`, {
            name: symptom,
            description,
            whenAppeared: when,
            specialistId: specialist,
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
