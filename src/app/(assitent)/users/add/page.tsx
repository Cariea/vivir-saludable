'use client'

import { useEffect, useMemo, useState } from "react";
import { set, useForm } from "react-hook-form";
import { IoArrowBack } from "react-icons/io5";


import { NewUserInput, ProgramType, SpecialtyType } from "@/types";
import { getPrograms, getSpecialties, getUserInfo } from "@/actions/getActions";
import { useRouter, useSearchParams } from "next/navigation";
import { createUser } from "@/actions/postActions";
import { updateUser } from "@/actions/putActions";
import { withRoles } from "@/components/WithRolesWrapper";

const UserRegister = () => {
    const searchParams = useSearchParams();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [specialties, setSpecialties] = useState<SpecialtyType[]>([]);
    const [programs, setPrograms] = useState<ProgramType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue
    } = useForm<NewUserInput>();
    const router = useRouter();

    const watchuserType = watch("role", "specialist");

    const isEditing = useMemo(() => {
        const param = searchParams.get("edit");

        return param ? true : false;
    }, [searchParams])
    
    const userId = useMemo(() => {
        const param = searchParams.get("userId");

        return param ? param : "";
    
    }, [searchParams])

    const onSubmit = async (data: NewUserInput) => {
        if (data.role === "pacient") {
            delete data.specialityId;
        }

        let response;
        const newData = {
            ...data,
            name: `${data.name} ${data.lastName}`,
            address: data.address || ""
        };

        if (isEditing){
            response = await updateUser(newData);
        } else {
            response = await createUser(newData);
        }

        if (response.status === 201 || response.status === 200) {
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

            if (isEditing) {
                const userResponse = await getUserInfo(userId);

                if (userResponse.status === 200) {
                    const user = userResponse.data;
                    const { name, lastName, email, phone, specialty, program, address } = user;

                    setValue("name", name.split(" ")[0]);
                    setValue("lastName", name.split(" ")[1] || lastName);
                    setValue("userId", userId)
                    setValue("email", email);
                    setValue("phone", phone);
                    setValue("role", specialty ? "specialist" : "pacient");
                    setValue("address", address);
                    if (specialty) {
                        setValue("specialityId", response.data.items.find((specialtyItem: any) => specialtyItem.name === specialty).specialtyId);
                    } else {
                        setValue("programId", programs.data.items.find((programItem: any) => programItem.name === program).programId);
                    }
                }
            }
            setLoading(false);
        }

        getData();
    }, [isEditing, userId, setValue]);

    return (
        <>
            {errorMessage !== "" && (
                <div className="absolute right-0 left-0 top-0">
                    <div role="alert" className="fixed alert alert-error rounded-none p-4">
                        <span className="font-bold block w-full text-center">{errorMessage}</span>
                    </div>
                </div>
            )}
            <button className="btn btn-ghost text-gray-400 p-0 h-auto" onClick={() => router.back()}>
                <IoArrowBack className="size-8" />
            </button>
            {isLoading ?
                <div className="h-full flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
                : <>
                    <h1 className="text-4xl text-primary mt-8 mb-2 font-bold">{isEditing ? "Editar Usuario" : "Nuevo Usuario"}</h1>
                    <span className="text-gray-400 text-sm">Por favor, complete la siguiente información</span>
                    <h4 className="text-primary font-bold mt-8 mb-2">Tipo de Usuario</h4>
                    <div className="grid gap-x-4 grid-cols-2 w-full">
                        <input
                            className="btn py-2 px-9 rounded-8xl w-full shadow-base font-normal bg-white text-gray-400 border-0 checked:text-white disabled:bg-gray-50 disabled:text-gray-300"
                            type="radio"
                            aria-label="Especialista"
                            value="specialist"
                            disabled={isEditing}
                            defaultChecked={watchuserType === "specialist"}
                            {...register("role")}
                        />
                        <input
                            className="btn py-2 px-8 rounded-8xl w-full shadow-base font-normal bg-white text-gray-400 border-0 checked:text-white disabled:bg-gray-50 disabled:text-gray-300"
                            type="radio"
                            aria-label="Paciente"
                            disabled={isEditing}
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
                                disabled={isEditing}
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
                                className="input disabled:bg-gray-50 disabled:border-gray-50 disabled:text-gray-300"
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
                            <input
                                type="text"
                                placeholder="Dirección"
                                {...register("address", { required: true })}
                                className="input"
                            />
                            {errors.address && <span className="text-red-500">Campo Requerido</span>}
                        </div>
                        <div className="flex flex-col gap-y-2 w-full">
                            {watchuserType === "specialist" ? (
                                <>
                                    <select className="select select-ghost" {...register("specialityId", { setValueAs: (v) => parseInt(v) })}>
                                        <option className="text-gray-200" disabled defaultChecked>Seleccione Especialidad</option>
                                        {specialties.map((specialty) => (
                                            <option key={specialty.specialtyId} value={specialty.specialtyId}>{specialty.name}</option>
                                        ))}
                                    </select>
                                    {errors.specialityId && <span className="text-red-500">Campo Requerido</span>}
                                </>
                            ) : (
                                <>
                                    <select className="select select-ghost" {...register("programId", { setValueAs: (v) => parseInt(v) })}>
                                        <option className="text-gray-200" disabled defaultChecked>Seleccione Programa</option>
                                        {programs.map((program) => (
                                            <option key={program.programId} value={program.programId}>{program.name}</option>
                                        ))}
                                    </select>
                                    {errors.programId && <span className="text-red-500">Campo Requerido</span>}
                                </>
                            )}
                        </div>
                    </form>
                    <button className="btn btn-primary p-4 rounded-8xl w-full text-white my-8" onClick={handleSubmit(onSubmit)}>{isEditing ? "Guardar Cambios" : "Registar"}</button>
                </>
            }
            
        </>
    )
}

export default withRoles(UserRegister, ["asistent"]);