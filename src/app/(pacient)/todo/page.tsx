"use client";

import Image from "next/image";

import { IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import { useEffect, useMemo, useState } from "react";
import { CurrentPacient } from "@/types";
import { getMe } from "@/actions/getActions";

import Logo from "@/images/Logo.png";
import { withRoles } from "@/components/WithRolesWrapper";
import Navbar from "@/components/Navbar";

const TodoPage = ({}) => {
    const [currentUserInfo, setCurrentUserInfo] = useState<CurrentPacient>({} as CurrentPacient);
    const [currentSpecialty, setCurrentSpecialty] = useState<string>("");

    useEffect(() => {
        const getData = async () => {
            const response = await getMe();

            if (response.status === 200) {
                setCurrentUserInfo(response.data);
                setCurrentSpecialty(response.data.specialists[0].especialty);
            }
        };

        getData();
    }, []);

    const nextSpecialty = () => {
        if (!currentUserInfo.specialists.length) return;

        const currentIndex = currentUserInfo.specialists.indexOf(
            currentUserInfo.specialists.filter(
                (specialty) => specialty.especialty === currentSpecialty
            )[0]
        );

        if (currentIndex === currentUserInfo.specialists.length - 1) return;

        setCurrentSpecialty(currentUserInfo.specialists[currentIndex + 1].especialty);
    };

    const previousSpecialty = () => {
        if (!currentUserInfo.specialists.length) return;

        const currentIndex = currentUserInfo.specialists.indexOf(
            currentUserInfo.specialists.filter(
                (specialty) => specialty.especialty === currentSpecialty
            )[0]
        );

        if (currentIndex === 0) return;

        setCurrentSpecialty(currentUserInfo.specialists[currentIndex - 1].especialty);
    };

    const previousButtonDisabled = useMemo(() => {
        if (!currentUserInfo || !currentUserInfo.specialists) return true;

        return currentUserInfo.specialists.length
            ? currentUserInfo.specialists.indexOf(
                  currentUserInfo.specialists.filter(
                      (specialty) => specialty.especialty === currentSpecialty
                  )[0]
              ) === 0
            : true;
    }, [currentUserInfo, currentSpecialty]);

    const nextButtonDisabled = useMemo(() => {
        if (!currentUserInfo || !currentUserInfo.specialists) return true;

        return currentUserInfo.specialists.length
            ? currentUserInfo.specialists.indexOf(
                  currentUserInfo.specialists.filter(
                      (specialty) => specialty.especialty === currentSpecialty
                  )[0]
              ) ===
                  currentUserInfo.specialists.length - 1
            : true;
    }, [currentUserInfo, currentSpecialty]);

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <IconButton
                    size="medium"
                    disabled={previousButtonDisabled}
                    sx={{ paddingX: 0 }}
                    aria-label="Left Arrow"
                    onClick={previousSpecialty}
                    color="primary"
                >
                    <ChevronLeft />
                </IconButton>
                <h4 className="font-bold text-primary-default">{currentSpecialty}</h4>
                <IconButton
                    size="medium"
                    disabled={nextButtonDisabled}
                    sx={{ paddingX: 0 }}
                    aria-label="Right Arrow"
                    onClick={nextSpecialty}
                    color="primary"
                >
                    <ChevronRight />
                </IconButton>
            </Stack>
            <Navbar />
        </>
    );
}


export default withRoles(TodoPage, ["pacient", "specialist"]);