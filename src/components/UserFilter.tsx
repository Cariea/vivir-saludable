"use client";

import { useState, createRef, useEffect, useMemo } from "react";
import { IoFilter, IoClose } from "react-icons/io5";

import { getSpecialties, getPrograms } from "@/actions/getActions";
import { SpecialtyType, ProgramType } from "@/types";
import {
    Badge,
    Button,
    Container,
    Grid,
    IconButton,
    Stack,
    SwipeableDrawer,
    Typography,
    styled,
} from "@mui/material";
import { Close, FilterList } from "@mui/icons-material";

interface FilterProps {
    setOriginalSelection: (selection: any) => void;
}

interface SelectionProps {
    byRole?: string;
    bySpecialty?: string[];
    byProgram?: string[];
    byClinicCenter?: string[];
}

const ClearButton = styled(Button)({
    width: "auto",
    backgroundColor: "#f5f9ff",
    boxShadow: "none",
    padding: 0,
});

const FilterBadge = styled(Badge)({
    "& .MuiBadge-badge": {
        top: 6,
        right: 6,
    },
});
export default function UserFilter({ setOriginalSelection }: FilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selection, setSelection] = useState<SelectionProps>({});
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

        setSelection && setSelection({ ...selection, byProgram: [program, ...programSelection] });
    };

    const onClear = (category: string) => {
        if (category === "all") {
            setSelection({});
        } else {
            setSelection({ ...selection, [category]: undefined });
        }

        const radios = document.getElementsByName(category);
        for (let i = 0; i < radios.length; i++) {
            (radios[i] as HTMLInputElement).checked = false;
        }
    };

    const onReset = () => {
        onClear("all");
        setIsOpen(false);
    };

    const onFilter = () => {
        setOriginalSelection(selection);
        setIsOpen(false);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsOpen(newOpen);
    };

    const filterSelectionBadgeCount = useMemo(
        () =>
            (selection.byRole ? 1 : 0) +
            (selection.byProgram ? 1 : 0) +
            (selection.bySpecialty ? 1 : 0),
        [selection]
    );

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
        };

        getSpecialtiesData();
    }, []);

    return (
        <>
            <FilterBadge
                color="primary"
                badgeContent={filterSelectionBadgeCount}
                invisible={filterSelectionBadgeCount === 0 ? true : false}
            >
                <IconButton
                    aria-label="filter"
                    color="default"
                    className="shadow-base text-gray-400"
                    sx={{ padding: "1rem", borderRadius: "100%", backgroundColor: "white" }}
                    onClick={toggleDrawer(true)}
                >
                    <FilterList className="text-gray-400" />
                </IconButton>
            </FilterBadge>
            <SwipeableDrawer
                open={isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                anchor="bottom"
            >
                <Container maxWidth="sm" className="mb-20">
                    <div className="flex items-end mb-4">
                        <IconButton
                            aria-label="close"
                            onClick={onDismiss}
                            sx={{ marginLeft: "auto" }}
                        >
                            <Close className="text-gray-400" />
                        </IconButton>
                    </div>
                    {/** By Role */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        minWidth="100%"
                        marginBottom={2}
                    >
                        <h3 className="text-2xl font-bold text-primary-default">
                            Por Tipo de Usuario
                        </h3>
                        {!!selection.byRole && (
                            <ClearButton
                                startIcon={<Close />}
                                onClick={() => onClear("byRole")}
                                variant="text"
                                color="secondary"
                            >
                                Limpiar
                            </ClearButton>
                        )}
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color={selection.byRole === "specialist" ? "primary" : "inherit"}
                                onClick={() =>
                                    setSelection &&
                                    setSelection({ ...selection, byRole: "specialist" })
                                }
                            >
                                Especialista
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color={selection.byRole === "pacient" ? "primary" : "inherit"}
                                onClick={() =>
                                    setSelection &&
                                    setSelection({ ...selection, byRole: "pacient" })
                                }
                            >
                                Paciente
                            </Button>
                        </Grid>
                    </Grid>
                    {!!specialties.length && (
                        <>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                minWidth="100%"
                                marginBottom={2}
                                marginTop={4}
                            >
                                <h3 className="text-2xl font-bold text-primary-default">
                                    Por Especialidad
                                </h3>
                                {!!selection.bySpecialty?.length && (
                                    <ClearButton
                                        startIcon={<Close />}
                                        onClick={() => onClear("bySpecialty")}
                                        variant="text"
                                        color="secondary"
                                    >
                                        Limpiar
                                    </ClearButton>
                                )}
                            </Stack>
                            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={2}>
                                {specialties.map((specialty: SpecialtyType) => (
                                    <Button
                                        key={specialty.specialtyId}
                                        variant="contained"
                                        color={
                                            selection.bySpecialty?.includes(specialty.name)
                                                ? "primary"
                                                : "inherit"
                                        }
                                        sx={{ width: "fit-content" }}
                                        onClick={() => setBySpecialty(specialty.name)}
                                    >
                                        {specialty.name}
                                    </Button>
                                ))}
                            </Stack>
                            {!!programs.length && (
                                <>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        minWidth="100%"
                                        marginBottom={2}
                                        marginTop={4}
                                    >
                                        <h3 className="text-2xl font-bold text-primary-default">
                                            Por Programa
                                        </h3>
                                        {!!selection.byProgram?.length && (
                                            <ClearButton
                                                startIcon={<Close />}
                                                onClick={() => onClear("byProgram")}
                                                variant="text"
                                                color="secondary"
                                            >
                                                Limpiar
                                            </ClearButton>
                                        )}
                                    </Stack>
                                    <Stack direction="row" flexWrap="wrap" useFlexGap spacing={2}>
                                        {programs.map((program: ProgramType) => (
                                            <Button
                                                key={program.programId}
                                                variant="contained"
                                                color={
                                                    selection.byProgram?.includes(program.name)
                                                        ? "primary"
                                                        : "inherit"
                                                }
                                                sx={{ width: "fit-content" }}
                                                onClick={() => setByProgram(program.name)}
                                            >
                                                {program.name}
                                            </Button>
                                        ))}
                                    </Stack>
                                </>
                            )}
                        </>
                    )}
                    <Grid
                        container
                        columnSpacing={2}
                        rowSpacing={0}
                        className="fixed left-0 right-0 bottom-0 pb-4 pt-2 px-4 bg-white-dark"
                    >
                        <Grid item xs={6} paddingTop={0}>
                            <Button
                                variant="text"
                                sx={{ backgroundColor: "white" }}
                                onClick={onReset}
                            >
                                Restablecer
                            </Button>
                        </Grid>
                        <Grid item xs={6} paddingTop={0}>
                            <Button color="primary" variant="contained" onClick={onFilter}>
                                Filtrar
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </SwipeableDrawer>
        </>
    );
}
