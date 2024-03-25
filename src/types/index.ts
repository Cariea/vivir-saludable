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

export interface SpecialistType {
    specialistId: string;
    name: string;
    especialty: string;
}

export interface SymptomsType {
    symptomId: number;
    name: string;
    description: string;
    whenAppeared: string;
    specialistId: string;
}

export interface MealType {
    mealId: number;
    description: string;
    mealImageUrl: string;
    wasSatified: boolean;
    indicateHour: string;
    pica: boolean;
}

export interface ActivityType {
    activityId: number;
    name: string;
    hour: string;
    time: number;
    distance: number;
    weight: number;
    repetitions: number;
    description: string;
}

export interface AntropometricType {
    armCircumference: number;
    legCircumference: number;
    waist: number;
    hip: number;
    weight: number;
    size: number;
    musculokeletalMass: number;
    bodyFatMass: number;
    bodyMassIndex: number;
    bodyFatPercentage: number;
    waistHipRatio: number;
    visceralFatLevel: number;
}

export interface PostprocedureSymptomType {
    recordId: number;
    temperate: number;
    redness: boolean;
    swelling: boolean;
    secretions: boolean;
    pain: boolean;
    temperatureHigh: boolean;
    createdAt: string;
}

export interface SecretionType {
    recordId: number;
    abundant: boolean;
    yellow: boolean;
    blood: boolean;
    smelly: boolean
}

export interface CurrentPacient {
    userId: string;
    name: string;
    email: string;
    phone: string;
    createAt: string;
    program: string;
    nextQuoteDate: string;
    specialists: SpecialistType[];
    symptoms: SymptomsType[];
    meals: MealType[];
    activities: ActivityType[];
    antropometrics: AntropometricType[];
    postProcedureSymptoms: PostprocedureSymptomType[];
    secretions: SecretionType[];
}

export interface StoredMessage {
    userId: string;
    messageId?: string;
    message: string;
    userReceptor: string;
    createdAt: string;
}

export interface ChatMessage {
    from: string,
    to: string,
    text: string
}
export interface Assignments {
    specialistName: string;
    specialty: string;
    date: string;
    recordId: number;
    description: string;
    completed: boolean;
}