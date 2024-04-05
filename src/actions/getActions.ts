'use server'

import axios from "axios";

import { getSession } from "@/actions/authActions";
import config from "@/config/config";

interface UserListParams {
    size: number;
    page: number;
}

interface ChatMessagesParams {
    size: number;
    page: number;
    toUserId: string;
}

export async function getSpecialties() {
    const session = await getSession();
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

export async function getMe() {
    const session = await getSession();

    try {
        const response = await axios.get(`${config.apiUrl}pacients/me`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            }
        });

        return {
            status: response.status,
            data: response.data
        }
        
    } catch(error) {
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
            message: "Internal Server Error"
        };
    }
}

export async function getPrograms() {
    const session = await getSession();

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
    const session = await getSession();

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
    const session = await getSession();

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

export async function getSpecialists() {
    const session = await getSession();

    try {
        const response = await axios.get(`${config.apiUrl}users`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                role: "specialist"
            }
        });

        return {
            status: response.status,
            data: response.data
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
            message: "Internal Server Error"
        };
    }
}

export async function getPacients() {
    const session = await getSession();

    try {
        const response = await axios.get(`${config.apiUrl}users`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                role: "pacient"
            }
        });

        return {
            status: response.status,
            data: response.data
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
            message: "Internal Server Error"
        };
    }
}

export async function getAvailableUsersForLink(userId: string) {
    const session = await getSession();

    try {
        const response = await axios.get(`${config.apiUrl}linker`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                userId
            }
        });

        return {
            status: response.status,
            data: response.data
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
            message: "Internal Server Error"
        };
    }
}

export async function getUserContacts() {
    const session = await getSession();

    console.log(session);

    try {
        const response = await axios.get(`${config.apiUrl}users/contacts`, {
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

export async function getChatMessages({ toUserId }: { toUserId: string }) {
    const session = await getSession();

    try {
        const response = await axios.get(`${config.apiUrl}messages`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                toUserId
            }
        });

        return {
            status: response.status,
            data: response.data
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
            message: "Internal Server Error"
        };
    }
}
export const getDailyAssignments = async (userId: string) => {
    const session = await getSession();
    try {
        const response = await axios.get(`${config.apiUrl}daily-assignments/pacient`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                userId
            }
        });

        return {
            status: response.status,
            data: response.data
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
            message: "Internal Server Error"
        };
    }
}

export const getPacientSpecialists = async ( ) => {
    const session = await getSession();
    try {
        const response = await axios.get(`${config.apiUrl}specialists/pacient`, {
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

export const getSpecialistPacients = async ({size,page}:{size:number, page:number}) => {
    const session = await getSession();
    try {
        const response = await axios.get(`${config.apiUrl}pacients/specialist/pacients`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                size,
                page
            }
        });

        return {
            status: response.status,
            data: response.data
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
            message: "Internal Server Error"
        };
    }
}

export async function getMeSpecialist() {
    const session = await getSession();

    try {
        const response = await axios.get(`${config.apiUrl}specialists/me`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            }
        });

        return {
            status: response.status,
            data: response.data
        }
        
    } catch(error) {
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
            message: "Internal Server Error"
        };
    }
}

export async function getPacient(pacientId: string)  {
    const session = await getSession();

    try {
        const response = await axios.get(`${config.apiUrl}pacients/${pacientId}`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            }
        });
        return {
            status: response.status,
            data: response.data
        }
        
    } catch(error) {
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
            message: "Internal Server Error"
        };
    }
}

export const getIngredientsByMeal = async (mealId: number) => {
    const session = await getSession();

    try {
        const response = await axios.get(`${config.apiUrl}ingredients/`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                mealId,
                size: 100,
            }
        });
        return {
            status: response.status,
            data: response.data
        }
        
    } catch(error) {
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
            message: "Internal Server Error"
        };
    }
}

export const getIndications = async () => {
    const session = await getSession();
    try {
        const response = await axios.get(`${config.apiUrl}indications`, {
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

export const getSpecialistIndications = async (pacientId: string) => {
    const session = await getSession();
    try {
        const response = await axios.get(`${config.apiUrl}indications/get-for-linker`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                pacientId
            }
        });

        return {
            status: response.status,
            data: response.data
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
            message: "Internal Server Error"
        };
    }
}

export const getMeByToken = async () => {
    const session = await getSession();

    try {
        const response = await axios.get(`${config.apiUrl}users/bytoken`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            }
        });

        return {
            status: response.status,
            data: response.data
        }
        
    } catch(error) {
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
            message: "Internal Server Error"
        };
    }
}

export const getIndicationsComplianceReports = async (pacientId: string) => {
    const session = await getSession();
    try {
        const response = await axios.get(`${config.apiUrl}indications/get-for-reports`, {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
            params: {
                pacientId
            }
        });

        return {
            status: response.status,
            data: response.data
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
            message: "Internal Server Error"
        };
    }
}