"use client";

import { useState, createRef, useEffect } from "react";
import { Sheet, Content, detents, Portal, Header, Footer } from "react-sheet-slide";
import { IoFilter, IoClose } from "react-icons/io5";

import "react-sheet-slide/style.css";

import { getSpecialties, getPrograms } from "@/actions/getActions";

interface FilterProps {
    selection: {
        byRole?: string;
        bySpecialty?: string[];
        byProgram?: string[];
        byClinicCenter?: string[];
    };
    setSelection?: (selection: any) => void;
};

interface SpecialtyType {
    specialtyId: number;
    name: string;
}

interface ProgramType {
    programId: number;
    name: string;
    description: string;
}

export default function UserFilter({ selection, setSelection }: FilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [specialties, setSpecialties] = useState<SpecialtyType[]>([]);
    const [programs, setPrograms] = useState<ProgramType[]>([]);
    const ref = createRef<HTMLDivElement>();

    const onDismiss = () => {
        setIsOpen(false);
    };

    const setBySpecialty = (specialty: string) => {
        const specialtySelection = selection.bySpecialty || [];
        if (specialtySelection.includes(specialty)) {
            setSelection &&
                setSelection({
                    ...selection,
                    bySpecialty: specialtySelection.filter((s) => s !== specialty),
                });
            return;
        }

        setSelection &&
            setSelection({ ...selection, bySpecialty: [specialty, ...specialtySelection] });
    };

    const setByProgram = (program: string) => {
        const programSelection = selection.byProgram || [];
        if (programSelection.includes(program)) {
            setSelection &&
                setSelection({
                    ...selection,
                    byProgram: programSelection.filter((s) => s !== program),
                });
            return;
        }

        setSelection &&
            setSelection({ ...selection, byProgram: [program, ...programSelection] });
    };

    const onClear = (category: string) => {
        setSelection && setSelection({ ...selection, [category]: undefined });

        const radios = document.getElementsByName(category);
        for (let i = 0; i < radios.length; i++) {
            (radios[i] as HTMLInputElement).checked = false;
        }
    };

    useEffect(() => {
        const getSpecialtiesData = async () => {
            const speCialtiesResponse = await getSpecialties();
            const programResponse = await getPrograms();

            if (speCialtiesResponse.status === 200) {
                setSpecialties(speCialtiesResponse.data.items);
            }
            if (programResponse.status === 200) {
                setPrograms(programResponse.data.items);
            }
        }

        getSpecialtiesData();
    }, [])

    return (
        <>
            <button className="btn rounded-full border-0 h-[58px] w-[58px] shadow-base bg-white text-gray-400">
                <IoFilter className="size-4" onClick={() => setIsOpen(true)} />
            </button>
            <Portal>
                <div
                    className={`transition-[display] ${
                        isOpen ? "block h-full" : "hidden h-0"
                    } absolute top-0 w-screen bg-black/70`}
                ></div>
                <Sheet
                    scrollingExpands
                    ref={ref}
                    open={isOpen}
                    onDismiss={onDismiss}
                    selectedDetent={detents.large}
                    detents={(props) => [detents.large(props), detents.fit(props)]}
                    useModal={false}
                    useDarkMode={false}
                >
                    <Header className="hidden"></Header>
                    <Content className="rss-content p-8">
                        <button className="btn rounded-full border-0 btn-ghost p-0 ml-auto">
                            <IoClose className="size-8 text-gray-400" onClick={onDismiss} />
                        </button>
                        {/** By Role */}
                        <div className="flex justify-between items-center w-full my-4">
                            <h3 className="text-2xl font-bold text-primary">Por Tipo de Usuario</h3>
                            {!!selection.byRole && (
                                <button
                                    className="btn btn-ghost text-sm btn-sm text-secondary/70 p-0"
                                    onClick={() => onClear("byRole")}
                                >
                                    <IoClose className="size-5" />
                                    Limpiar
                                </button>
                            )}
                        </div>
                        <div className="join gap-x-4">
                            <input
                                className="btn py-2 px-8 rounded-8xl shadow-base font-normal bg-white text-gray-400 border-0 checked:text-white"
                                type="radio"
                                name="byRole"
                                aria-label="Especialista"
                                onClick={() =>
                                    setSelection &&
                                    setSelection({ ...selection, byRole: "Especialista" })
                                }
                            />
                            <input
                                className="btn py-2 px-8 rounded-8xl shadow-base font-normal bg-white text-gray-400 border-0 checked:text-white"
                                type="radio"
                                name="byRole"
                                aria-label="Paciente"
                                onClick={() =>
                                    setSelection &&
                                    setSelection({ ...selection, byRole: "Paciente" })
                                }
                            />
                        </div>
                        {/** By Specialty */}
                        {!!specialties.length && (
                            <>
                                <div className="flex justify-between items-center w-full my-4 mt-8">
                                    <h3 className="text-2xl font-bold text-primary">Por Especialidad</h3>
                                    {!!selection.bySpecialty?.length && (
                                        <button
                                            className="btn btn-ghost text-sm btn-sm text-secondary/70 p-0"
                                            onClick={() => onClear("bySpecialty")}
                                        >
                                            <IoClose className="size-5" />
                                            Limpiar
                                        </button>
                                    )}
                                </div>
                                <div className="join gap-4 flex flex-wrap">
                                    {specialties.map((specialty: SpecialtyType) => (
                                        <input
                                            key={specialty.specialtyId}
                                            className="btn py-2 px-8 rounded-8xl shadow-base font-normal bg-white text-gray-400 border-0 checked:text-white"
                                            type="checkbox"
                                            name="bySpecialty"
                                            aria-label={specialty.name}
                                            onClick={() => setSelection && setBySpecialty(specialty.name)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                        {/** By Program */}
                        {!!programs.length && (
                            <>
                                <div className="flex justify-between items-center w-full my-4 mt-8">
                                    <h3 className="text-2xl font-bold text-primary">Por Programa</h3>
                                    {!!selection.byProgram?.length && (
                                        <button
                                            className="btn btn-ghost text-sm btn-sm text-secondary/70 p-0"
                                            onClick={() => onClear("byProgram")}
                                        >
                                            <IoClose className="size-5" />
                                            Limpiar
                                        </button>
                                    )}
                                </div>
                                <div className="join gap-4 flex flex-wrap">
                                    {programs.map((program: ProgramType) => (
                                        <input
                                            key={program.programId}
                                            className="btn py-2 px-8 rounded-8xl shadow-base font-normal bg-white text-gray-400 border-0 checked:text-white"
                                            type="checkbox"
                                            name="byProgram"
                                            aria-label={program.name}
                                            onClick={() => setSelection && setByProgram(program.name)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </Content>
                    <Footer className="hidden"></Footer>
                </Sheet>
            </Portal>
        </>
    );
}
