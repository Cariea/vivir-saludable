'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation'

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoArrowBack } from "react-icons/io5";

import Logo from "../../images/Logo.png";
import { forgotPassword } from "@/actions/postActions";

type Inputs = {
    email: string;
};

export default function ResetPassword() {
    const router = useRouter();

    const [showMessage, setShowMessage] = useState<Boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        const response = await forgotPassword(data.email);
        if (response.status === 200) {
          showMessage ? setShowMessage(false) : setShowMessage(true);
        }else{
          console.log('error');
        }
    }

    return (
        <>
            <button className="relative p-4 rounded-full hover:bg-gray-400/10" onClick={() => router.push("/login")}>
                <IoArrowBack className="text-gray-400 size-6" />
            </button>
            <div className="flex flex-col items-center pt-16 gap-y-16">
                <Image src={Logo} alt="Vivir Saludable" className="w-1/2" />
                <div className="flex flex-col gap-y-2 w-full items-center">
                    <h1 className="text-4xl text-primary-default font-bold text-center">Reseteo de Contraseña</h1>
                    <span className="text-gray-400 text-center">
                        Introduzca su correo electrónico para recibir una nueva contraseña.
                    </span>
                </div>
                <div className="flex flex-col gap-y-4 w-full">
                    <div className="flex flex-col gap-y-2 w-full">
                        <input
                            type="email"
                            placeholder="Tu Correo Electrónico"
                            {...register("email", { 
                                required: {
                                    value: true,
                                    message: "Campo requerido"
                                }
                            })}
                            className="block shadow-base rounded-full w-full p-4 text-black placeholder-gray-200 bg-white focus:bg-white outline-1 outline-secondary focus:ring-secundary focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <button className="btn btn-primary w-full rounded-full py-4 " onClick={handleSubmit(onSubmit)}>
                        Enviar Correo Electrónico
                    </button>
                </div>
            </div>
            {showMessage && (
                <div className="absolute bottom-0 right-0 left-0 flex items-center justify-center bg-secondary-default text-primary-default text-center px-4 py-3" role="alert">
                    <span><strong>Correo Enviado.</strong> Revise su bandeja de entrada o spam para ver su contraseña.</span>
                </div>
            )}
        </>
    )
}