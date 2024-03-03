"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoAdd, IoPencil, IoSearch } from "react-icons/io5";
import { useAnimate } from "framer-motion";

import { PacientInfoByUser, SpecialistInfoByUser, User, UserInfoByAssitent } from "@/types";
import { getUserInfo } from "@/actions/getActions";

import UserCard from "@/components/UserCard";
import LinkPatientSpecialistOverlay from "@/components/LinkPatientSpecialistOverlay";

import UserInfoLoading from "./loading";
import { Avatar } from "@mui/material";
import { withRoles } from "@/components/WithRolesWrapper";

const UserInfo = ({ params }: { params: { userId: string } }) => {
    const router = useRouter();
    const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<UserInfoByAssitent>({} as UserInfoByAssitent);
    const [mustUpdateUser, setUpdateUser] = useState<boolean>();
    const [searchInput, setSearchInput] = useState<string>("");

    const userAlias = useMemo(
        () =>
            userInfo.name
                ? userInfo.name.includes(" ")
                    ? userInfo.name[0].toUpperCase() +
                      userInfo.name[userInfo.name.indexOf(" ") + 1].toLocaleUpperCase()
                    : userInfo.name[0].toUpperCase()
                : "",
        [userInfo]
    );

    const transformUserInfo = useCallback(
        (userInfo: PacientInfoByUser | SpecialistInfoByUser): User => {
            if ("specialty" in userInfo) {
                return {
                    userId: userInfo.userId,
                    name: userInfo.specialistName,
                    email: userInfo.email,
                    role: "specialist",
                    especialty: userInfo.specialty,
                    status: true,
                    pacients: 0,
                    especialists: 0,
                    programs: 0,
                    program: "",
                };
            } else {
                return {
                    userId: userInfo.userId,
                    name: userInfo.pacientName,
                    email: userInfo.email,
                    role: "pacient",
                    especialty: "",
                    status: true,
                    pacients: 0,
                    especialists: 0,
                    programs: 0,
                    program: userInfo.programName || "",
                };
            }
        },
        []
    );

    useEffect(() => {
        const getData = async () => {
            const response = await getUserInfo(params.userId);

            if (response.status === 200) {
                setUserInfo(response.data);
            } else {
                throw new Error(response.message);
            }

            setIsLoading(false);
        };

        getData();
        setUpdateUser(false);
    }, [params.userId, mustUpdateUser]);

    return isLoading ? (
        <UserInfoLoading />
    ) : (
        <>
            <div
                className={`relative flex flex-col bg-white rounded-3xl shadow-base items-center p-8 pt-0 ${
                    isOverlayOpen && "pointer-events-none"
                }`}
            >
                <div className="relative -top-12 bg-primary h-24 w-24 flex items-center justify-center rounded-full">
                    <span className="text-white text-4xl font-bold">{userAlias}</span>
                </div>
                <span className="block text-gray-400 text-sm -mt-6">
                    {userInfo.specialty || "Paciente"}
                </span>
                <h1 className="text-2xl text-primary font-bold text-wrap text-center">
                    {userInfo.name}
                </h1>
                <div className="flex gap-x-2 items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="block text-secondary">Activo</span>
                </div>
                <button
                    className="btn btn-outline mt-8 btn-sm border-gray-500 text-gray-500 rounded-8xl w-full text-sm"
                    onClick={() => router.push(`/users/add?edit=true&userId=${params.userId}`)}
                >
                    <IoPencil className="size-4" />
                    Editar
                </button>
            </div>
            <h2 className="font-bold text-primary mt-8 mb-4">Información Personal</h2>
            <div className="bg-white shadow-base rounded-3xl p-8 flex flex-col gap-y-4">
                <div>
                    <span className="block text-xs text-gray-400">Cédula</span>
                    <span>{userInfo.userId}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Correo Electrónico</span>
                    <span>{userInfo.email}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Dirección</span>
                    <span>{userInfo.address}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Teléfono</span>
                    <span>{userInfo.phone}</span>
                </div>
                {userInfo.programs ? (
                    <div>
                        <span className="block text-xs text-gray-400 mb-2">Programas</span>
                        <div className="flex flex-wrap gap-2">
                            {userInfo.programs.map((program) => (
                                <div
                                    key={program.programId}
                                    className="rounded-full bg-secondary p-1 px-2 w-fit text-sm"
                                >
                                    {program.programName}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <span className="block text-xs text-gray-400">Programa</span>
                            <span>{userInfo.program}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-400">
                                Descripción del Programa
                            </span>
                            <span>{userInfo.description}</span>
                        </div>
                    </>
                )}
            </div>
            <h2 className="font-bold text-primary mt-8">
                {userInfo.specialty ? "Pacientes" : "Especialistas"}
            </h2>
            <div className="flex justify-between items-end gap-x-4 my-4 mb-8">
                <div className="relative flex items-center w-full">
                    <IoSearch className="absolute size-base ml-4 text-gray-200 left-0 focus:outline-none rtl:right-0 rtl:left-auto" />
                    <div className="flex flex-col gap-y-2 w-full">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="block input h-14 w-full left-icon"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </div>
                <LinkPatientSpecialistOverlay user={userInfo} setUpdate={setUpdateUser} />
            </div>
            <div className="flex flex-col gap-y-4">
                {userInfo.specialty
                    ? userInfo.pacients?.map((pacient) => (
                          <UserCard
                              user={transformUserInfo(pacient)}
                              key={pacient.userId}
                              noSpecialist
                              setUpdate={setUpdateUser}
                          />
                      ))
                    : userInfo.specialists?.map((specialist) => (
                          <UserCard
                              user={transformUserInfo(specialist)}
                              key={specialist.userId}
                              noSpecialist
                              noPatient
                              setUpdate={setUpdateUser}
                          />
                      ))}
            </div>
        </>
    );
};

export default withRoles(UserInfo, ["asistent"]);
