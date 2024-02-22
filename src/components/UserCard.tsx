'use client'

import Link from "next/link";
import { IoLayers, IoPerson } from "react-icons/io5";

import { User } from "@/types"
import { useRouter } from "next/navigation";

interface UserCardProps {
    user: User,
    key: string,
    noSpecialist?: boolean
    noPatient?: boolean
}

export default function UserCard({ user, noSpecialist, noPatient }: UserCardProps) {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/users/${user.userId}`)}
            className="bg-white shadow-base rounded-3xl w-full p-8"
        >
            <div>
                <span className="text-sm text-gray-400">
                    {user.role === "specialist" ? user.especialty : "Paciente"}
                </span>
                <h2 className="text-xl font-bold text-primary mt-1 mb-2 leading-4">
                    {user.name}
                </h2>
                {user.status ? (
                    <div className="flex gap-x-2 items-center">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span className="text-secondary text-sm">Activo</span>
                    </div>
                ) : (
                    <div className="flex gap-x-2 items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-red-500 text-sm">Inactivo</span>
                    </div>
                )}
            </div>
            <div className="flex justify-end gap-x-2 mt-8 items-end">
                {user.role === "specialist" ? (
                    <>
                        <div className="flex gap-x-1 items-center text-gray-400">
                            <IoLayers className="w-4 h-4" />
                            <span className="text-xs">
                                {user.programs} Programas
                            </span>
                        </div>
                        {!noPatient && (
                            <div className="flex gap-x-1 items-center text-gray-400">
                                <IoPerson className="w-4 h-4" />
                                <span className="text-xs">
                                    {user.pacients} Pacientes
                                </span>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex gap-x-1 items-center text-gray-400">
                            <IoLayers className="w-4 h-4" />
                            <span className="text-xs">{user.program}</span>
                        </div>
                        {!noSpecialist && (
                            <div className="flex gap-x-1 items-center text-gray-400">
                                <IoPerson className="w-4 h-4" />
                                <span className="text-xs">
                                    {user.especialists} Especialistas
                                </span>
                            </div>
                        )}
                        
                    </>
                )}
            </div>
        </div>
    );
}