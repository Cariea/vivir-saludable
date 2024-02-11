'use client'

import { useRouter } from "next/navigation";

import { IoPerson, IoPeople, IoAdd } from "react-icons/io5";

type NavbarProps = {
    selected: string;
}

export default function Navbar({ selected }: NavbarProps) {
    const router = useRouter();

    return (
        <div className="btm-nav bg-primary">
            <div className="flex flex-col items-center justify-center gap-y-0">
                <button className={`${selected === "users" ? "text-secondary" : "text-white"}`}>
                    <IoPeople className="size-6" />
                </button>
                {selected === "users" && 
                    <span className="text-secondary font-bold"> Usuarios</span>
                }
            </div>
            <div className="absolute transform left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button className="text-white bg-secondary rounded-full p-4" onClick={() => router.push("/users/add")}>
                    <IoAdd className="size-6" />
                </button>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <button className={`${selected === "profile" ? "text-secondary" : "text-white"}`}>
                    <IoPerson className="size-6" />
                </button>
                {selected === "profile" && 
                    <span className="text-secondary">Perfil</span>
                }
            </div>
        </div>
        
    );
}