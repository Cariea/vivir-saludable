"use client";

import { useEffect, useState, useMemo } from "react";

import { getMe, getPacientSpecialists } from "@/actions/getActions";

import { withRoles } from "@/components/WithRolesWrapper";
import SpecialistCard, { PacientSpecialists } from "@/components/SpecialistCard";
import { CurrentPacient} from "@/types";
import { IconButton, Stack } from "@mui/material";
import { Check, ChevronLeft, ChevronRight } from "@mui/icons-material";
import Meals from "@/components/pacient/nutricionist/Meals";


const UserList = () => {
    const [specialists, setSpecialists] = useState<PacientSpecialists[]>([]);
    const [currentUserInfo, setCurrentUserInfo] = useState<CurrentPacient>({} as CurrentPacient);
    const [currentSpecialty, setCurrentSpecialty] = useState<string>("");


    const getUserData = async () => {
        const user = await getMe();
        if (user.status === 200) {
            setCurrentUserInfo(user.data);
            setCurrentSpecialty(user.data.specialists[0].especialty);
        }
        const response = await getPacientSpecialists();
        if (response.status === 200) {
            setSpecialists(response.data);
        }
    };

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


    const specialistsBySpecialty = useMemo(() => {
        const filteredSpecialist = specialists.filter((specialist) => specialist.especialty === currentSpecialty)[0] as PacientSpecialists;
        return filteredSpecialist
    }, [specialists, currentSpecialty]);

    useEffect(() => {
        getUserData();
    }, []);

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
                <h4 className="font-bold text-primary">{currentSpecialty}</h4>
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
            
            <div className="pb-32 mt-8" style={{ maxHeight: 'calc(100vh - 11rem)', overflowY: 'auto' }}>
                <div className="flex flex-col gap-y-8 pb-12" >
                    {
                        specialistsBySpecialty && (
                            <SpecialistCard
                                user={specialistsBySpecialty}
                                pacientId={currentUserInfo.userId}
                            />
                        )
                    }
                </div>
                {
                    currentSpecialty === 'nutricionista' && (
                        <Meals />
                    )
                }
            </div>
        </>
    );
    
};

export default withRoles(UserList, ["pacient"]);
