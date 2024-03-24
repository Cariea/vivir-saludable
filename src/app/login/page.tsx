"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, MouseEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { authenticate } from "@/actions/authActions";
import Logo from "../../images/Logo.png";
import { Button } from "@mui/material";

type Inputs = {
    cedula: string;
    password: string;
};

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
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

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);

        const response = await authenticate(data.cedula, data.password);
        if (response?.status === 401) {
            setErrorMessage(response.message);
            setLoading(false);
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            setLoading(false);
            return;
        }
        setLoading(false);
        switch (response?.message.data) {
            case "specialist":
                router.push("/pacients");
            case "pacient":
                router.push("/specialists");
            default:
                router.push("/users");
        }
    };

    return (
        <div className="h-full px-4 flex flex-col items-center justify-center gap-y-16">
            <Image src={Logo} alt="Vivir Saludable" className="w-1/2" />
            <div className="flex flex-col gap-y-2 w-full items-center">
                <h1 className="text-4xl text-primary-default font-bold">Bienvenid@</h1>
                <span className="text-gray-400 text-center">
                    Inicia Sesión para comenzar tu seguimiento
                </span>
            </div>
            <form className="flex flex-col gap-y-8 w-full">
                <div className="flex flex-col gap-y-2 w-full">
                    <input
                        type="text"
                        placeholder="Tu Cédula"
                        {...register("cedula", { required: true })}
                        className="input"
                    />
                    {errors.cedula && <span className="text-red-500">Campo requerido</span>}
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onSubmit)}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-ring loading-xs"></span>
                        ) : "Iniciar sesión"
                        }
                    </Button>
                    {/* <button disabled={loading} className="btn btn-primary w-full rounded-full text-white-dark py-4" onClick={handleSubmit(onSubmit)}>
                        {loading ? (
                            <span className="loading loading-ring loading-xs"></span>
                        ) : "Iniciar sesión"
                        }
                    </button> */}
                    <Link href="/reset-password" className="text-gray-400 font-bold">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </form>
            {!!errorMessage && (
                <div role="alert" className="absolute bottom-0 left-0 right-0 rounded-none py-4 px-8 alert alert-error">
                    <span className="font-bold text-sm text-center">{errorMessage}</span>
                </div>
            )}
        </div>
    );
}
