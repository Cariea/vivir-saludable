"use client";

import { useEffect, useState, useMemo } from "react";
import { Add, Close, Search } from "@mui/icons-material";
import {
    Container,
    IconButton,
    Stack,
    SwipeableDrawer,
    Typography,
} from "@mui/material";

import { getPacients, getSpecialists } from "@/actions/getActions";
import { UserInfoByAssitent, User } from "@/types";

import UserSelector from "./UserSelector";

export default function LinkPatientSpecialistOverlay({
    user,
    setUpdate,
}: {
    user: UserInfoByAssitent;
    setUpdate: (value: boolean) => void;
}) {
    const [searchInput, setSearchInput] = useState<string>("");
    const [specialists, setSpecialists] = useState<User[]>([]);
    const [pacients, setPacients] = useState<User[]>([]);
    const [isOpen, setOpen] = useState<boolean>(false);

    const toggleDrawer = (value: boolean) => () => {
        setOpen(value);
    };

    useEffect(() => {
        const getData = async () => {
            const specialistResponse = await getSpecialists();
            const pacientResponse = await getPacients();

            if (specialistResponse.status === 200) {
                setSpecialists(specialistResponse.data.items);
            }

            if (pacientResponse.status === 200) {
                setPacients(pacientResponse.data.items);
            }
        };

        getData();
    }, []);

    const filteredList: User[] = useMemo(
        () =>
            !!user.specialty
                ? pacients.filter(
                      (pacient) => !user.pacients?.some((p) => p.userId === pacient.userId)
                  )
                : specialists.filter(
                      (specialist) => !user.specialists?.some((s) => s.userId === specialist.userId)
                  ),
        [user, pacients, specialists]
    );

    return (
        <>
            <IconButton
                aria-label="add"
                className="rounded-full shadow-base bg-primary text-white"
                sx={{ padding: 2, backgroundColor: "#003f52", color: "white" }}
                onClick={toggleDrawer(true)}
            >
                <Add />
            </IconButton>
            <SwipeableDrawer
                open={isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                anchor="bottom"
            >
                <Container maxWidth="sm">
                    <Stack justifyContent="space-between" alignItems="center" direction="row">
                        <Typography variant="h5" component="h1" color="primary" fontWeight="bold">
                            Agregar {user.specialty ? "Paciente" : "Especialista"}
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={toggleDrawer(false)}
                            sx={{ marginLeft: "auto" }}
                        >
                            <Close className="text-gray-400" />
                        </IconButton>
                    </Stack>
                    <div className="relative flex items-center w-full my-8">
                        <Search
                            fontSize="small"
                            className="absolute size-4 ml-4 text-gray-200 left-0 focus:outline-none rtl:right-0 rtl:left-auto"
                        />
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
                    <UserSelector
                        list={filteredList}
                        inputText={searchInput}
                        setUpdate={setUpdate}
                        toggleDrawer={toggleDrawer}
                        user={user}
                    />
                </Container>
            </SwipeableDrawer>
        </>
    );
}
