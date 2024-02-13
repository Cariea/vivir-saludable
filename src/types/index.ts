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
    specialityId?: string;
    programId?: string;
}