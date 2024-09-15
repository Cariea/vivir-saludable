'use client'

import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function UserInfoLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    
    return (
        <div className="pb-8">
            <button className="btn btn-ghost h-auto p-4 pl-0 text-gray-400" onClick={() => router.back()}>
                <IoArrowBack className="size-8" />
            </button>
            {children}
        </div>
    )
}