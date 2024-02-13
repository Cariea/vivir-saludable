'use client'

import Image from "next/image";

import { useState } from "react";
import { IoSearch } from "react-icons/io5";

import Logo from "../../images/Logo.png";

import Navbar from "@/components/Navbar"
import UserFilter from "@/components/UserFilter";
import { UserPageContext } from "@/contexts";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [filterSelection, setFilterSelection] = useState<Object>({});
    const [searchInput, setSearchInput] = useState<string>("");
    
    return (
        <>
            <Navbar selected="users" />
            <Image src={Logo} alt="Logo" className="size-8" />
            <div className="flex justify-between items-end gap-x-4 mt-4">
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
                <UserFilter selection={filterSelection} setSelection={setFilterSelection} />
            </div>
            <UserPageContext.Provider value={{
                selection: filterSelection,
                searchInput: searchInput
                }}
            >
                {children}
            </UserPageContext.Provider>
            
        </>
    )
}