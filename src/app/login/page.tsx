"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, MouseEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

import Logo from "../../images/Logo.png";

type Inputs = {
    email: string;
    password: string;
};

export default function Login() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const [showPassword, setShowPassword] = useState<Boolean>(false);

    const onShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        router.push("/users");
    };

    return (
        <div className="h-full flex flex-col items-center justify-center gap-y-16">
            <Image src={Logo} alt="Vivir Saludable" className="w-1/2" />
            <div className="flex flex-col gap-y-2 w-full items-center">
                <h1 className="text-4xl text-primary font-bold">Bienvenid@</h1>
                <span className="text-gray-400 text-center">
                    Inicia Sesión para comenzar tu seguimiento
                </span>
            </div>
            <form className="flex flex-col gap-y-8 w-full">
                <div className="flex flex-col gap-y-2 w-full">
                    <input
                        type="email"
                        placeholder="Tu Correo Electrónico"
                        {...register("email", { required: true })}
                        className="input"
                    />
                    {errors.email && <span className="text-red-500">Campo requerido</span>}
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                    <div className="relative flex items-center mt-2">
                        <button
                            className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto"
                            onClick={onShowPassword}
                        >
                            {showPassword ? (
                                <IoEyeOff className="text-gray-200 mr-4 size-6" />
                            ) : (
                                <IoEye className="text-gray-200 mr-4 size-6" />
                            )}
                        </button>
                        <div className="flex flex-col gap-y-2 w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Tu contraseña"
                                {...register("password", { required: true })}
                                className="block input"
                            />
                        </div>
                    </div>
                    {errors.password && <span className="text-red-500">Campo requerido</span>}
                </div>
                <div className="flex flex-col gap-y-4 w-full items-center">
                    <button className="btn btn-primary w-full rounded-full text-white-dark py-4" onClick={handleSubmit(onSubmit)}>
                        Iniciar sesión
                    </button>
                    <Link href="/reset-password" className="text-gray-400 font-bold">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </form>
        </div>
    );
}
