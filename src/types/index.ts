export interface SpecialtyType {
    specialtyId: number;
    name: string;
}

export interface ProgramType {
    programId: number;
    name: string;
    description: string;
}

export interface NewUserInput {
    role: string;
    userId: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    specialityId?: string;
    programId?: string;
}

export interface User {
    userId: string;
    name: string;
    email: string;
    role: string;
    especialty: string;
    status: boolean;
    pacients: number;
    especialists: number;
    programs: number;
    program: string;
}

export interface PacientInfoByUser {
    userId: string,
    pacientName: string,
    email: string,
    phone: string,
    programName: string,
    programDescription: string
}

export interface SpecialistInfoByUser {
    userId: string,
    specialistName: string,
    email: string,
    specialty: string,
    phone: string
}

export interface UserInfoByAssitent {
    userId: string,
    name: string,
    email: string,
    address?: string,
    asistentId?: string,
    phone: string,
    specialty?: string,
    programs?: {
        programId: number,
        programName: string,
        programDescription: string
    }[],
    pacients?: PacientInfoByUser[],
    program?: string,
    description?: string,
    specialists?: SpecialistInfoByUser[]
}