'use client'

import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { IoArrowBack } from "react-icons/io5";


import { NewUserInput, ProgramType, SpecialtyType } from "@/types";
import { getPrograms, getSpecialties } from "@/actions/getActions";
import { useRouter } from "next/navigation";
import { createUser } from "@/actions/postActions";

export default function UserRegister() {
    const [specialties, setSpecialties] = useState<SpecialtyType[]>([]);
    const [programs, setPrograms] = useState<ProgramType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<NewUserInput>();
    const router = useRouter();

    const watchuserType = watch("role", "specialist");

    const onSubmit = async (data: NewUserInput) => {
        if (data.role === "pacient") {
            delete data.specialityId;
        }

        const response = await createUser({
            ...data,
            name: `${data.name} ${data.lastName}`,
        });

        if (response.status === 201) {
            router.push("/users");
        } else {
            setErrorMessage(response.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    }

    useEffect(() => {
        const getData = async () => {
            const response = await getSpecialties();
            const programs = await getPrograms();

            if (response.status === 200) {
                setSpecialties(response.data.items);
            }
            if (programs.status === 200) {
                setPrograms(programs.data.items);
            }
        }

        getData();
    }, []);

    return (
        <>
            {errorMessage !== "" && (
                <div role="alert" className="absolute alert alert-error top-0 rounded-none right-0 left-0 p-4">
                    <span className="font-bold block w-full text-center">{errorMessage}</span>
                </div>
            )}
            <button className="btn btn-ghost text-gray-400 p-2 h-auto" onClick={() => router.push("/users")}>
                <IoArrowBack className="size-6" />
            </button>
            <h1 className="text-4xl text-primary mt-8 mb-2 font-bold">Nuevo Usuario</h1>
            <span className="text-gray-400 text-sm">Por favor, complete la siguiente información</span>
            <h4 className="text-primary font-bold mt-8 mb-2">Tipo de Usuario</h4>
            <div className="join w-full justify-between">
                <input
                    className="btn py-2 px-9 rounded-8xl shadow-base font-normal bg-white text-gray-400 border-0 checked:text-white"
                    type="radio"
                    aria-label="Especialista"
                    value="specialist"
                    defaultChecked
                    {...register("role")}
                />
                <input
                    className="btn py-2 px-8 rounded-8xl w-2/4 shadow-base font-normal bg-white text-gray-400 border-0 checked:text-white"
                    type="radio"
                    aria-label="Paciente"
                    value="pacient"
                    {...register("role")}
                />
            </div>
            <h4 className="text-primary font-bold mt-8 mb-4">Información Personal</h4>
            <form className="flex flex-col gap-y-8 w-full">
                <div className="flex flex-col gap-y-2 w-full">
                    <input
                        type="text"
                        placeholder="Cédula"
                        {...register(
                            "userId",
                            {
                                required: {
                                    value: true,
                                    message: "Campo requerido"
                                },
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Cédula inválida"
                                }
                            }
                        )}
                        className="input"
                    />
                    {errors.userId && <span className="text-red-500">{errors.userId.message}</span>}
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                    <input
                        type="text"
                        placeholder="Nombres"
                        {...register("name", { required: true })}
                        className="input"
                    />
                    {errors.name && <span className="text-red-500">Campo Requerido</span>}
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                    <input
                        type="text"
                        placeholder="Apellidos"
                        {...register("lastName", { required: true })}
                        className="input"
                    />
                    {errors.lastName && <span className="text-red-500">Campo Requerido</span>}
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                    <input
                        type="text"
                        placeholder="Correo Electrónico"
                        {...register(
                            "email",
                            {
                                required: {
                                    value: true,
                                    message: "Campo requerido"
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                    message: "Correo inválido"
                                }
                            }
                        )}
                        className="input"
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                    <input
                        type="text"
                        placeholder="Teléfono"
                        {...register(
                            "phone",
                            {
                                required: {
                                    value: true,
                                    message: "Campo requerido"
                                },
                                pattern: {
                                    value: /^[0-9]{9}$/,
                                    message: "Teléfono inválido"
                                }
                            }
                        )}
                        className="input"
                    />
                    {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                    {watchuserType === "specialist" ? (
                        <>
                            <select className="select select-ghost" {...register("specialityId", { setValueAs: (v) => parseInt(v) })}>
                                <option className="text-gray-200" disabled selected>Seleccione Especialidad</option>
                                {specialties.map((specialty) => (
                                    <option key={specialty.specialtyId} value={specialty.specialtyId}>{specialty.name}</option>
                                ))}
                            </select>
                            {errors.specialityId && <span className="text-red-500">Campo Requerido</span>}
                        </>
                    ) : (
                        <>
                            <select className="select select-ghost" {...register("programId", { setValueAs: (v) => parseInt(v) })}>
                                <option className="text-gray-200" disabled selected>Seleccione Programa</option>
                                {programs.map((program) => (
                                    <option key={program.programId} value={program.programId}>{program.name}</option>
                                ))}
                            </select>
                            {errors.programId && <span className="text-red-500">Campo Requerido</span>}
                        </>
                    )}
                </div>
            </form>
            <button className="btn btn-primary p-4 rounded-8xl w-full text-white my-8" onClick={handleSubmit(onSubmit)}>Registar</button>
        </>
    )
}