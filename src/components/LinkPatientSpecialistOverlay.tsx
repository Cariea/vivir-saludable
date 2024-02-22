"use client";

import { createRef, useState } from "react";
import { IoAdd, IoClose, IoSearch } from "react-icons/io5";
import { Sheet, Content, detents, Portal, Header, Footer } from "react-sheet-slide";

export default function LinkPatientSpecialistOverlay({
    userId,
    userType,
    isOpen,
    setOpen
}: {
    userId: string;
    userType: string;
    isOpen: boolean;
    setOpen: (v: boolean) => void;
}) {
    const [searchInput, setSearchInput] = useState<string>();
    const ref = createRef<HTMLDivElement>();

    const onDismiss = () => {
        setOpen(false)
    }

    return (
        <Portal>
            <Sheet
                scrollingExpands
                ref={ref}
                open={isOpen}
                onDismiss={onDismiss}
                selectedDetent={detents.fit}
                detents={(props) => [detents.large(props), detents.fit(props)]}
                useModal={false}
                useDarkMode={false}
            >
                <Header className="rss-header pt-8 pb-4">
                    <button className="btn btn-ghost p-0 text-gray-400 h-auto" onClick={() => setOpen(false)}>
                        <IoClose className="size-8" />
                    </button>
                </Header>
                <Content className="rss-content p-8">
                    Hello World
                </Content>
                <Footer className="hidden"></Footer>
            </Sheet>
        </Portal>
    )

    /* return (
        <div
            ref={scope}
            className="bg-white-dark h-screen z-50 absolute w-full left-0 p-8"
        >
            <button className="btn btn-ghost p-0 text-gray-400 h-auto" onClick={() => {
                setOpen(false);
                onExit();
            }}>
                <IoClose className="size-8" />
            </button>
            <h1 className="text-primary font-bold text-2xl mt-8 mb-4">{userType === "specialist" ? "Agregar Paciente" : "Agregar Especialista"}</h1>
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
        </div>
    ); */
}
