'use client'

import { Notifications, People, Person } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, styled } from "@mui/material";
import { useRouter } from "next/navigation";

type NavbarProps = {
    selected: string;
}

const StyledBottomNavigationAction = styled(BottomNavigationAction)({
    color: "#7898BA",
    '&.Mui-selected': {
        color: '#32c5a3'
    }
})

export default function AssistentNavbar({ selected }: NavbarProps) {
    const router = useRouter();

    return (
        <BottomNavigation
            showLabels
            value={selected}
            onChange={(event, newValue) => {
                router.push(newValue);
            }}
            className="fixed bottom-0 left-0 right-0"
        >
            <StyledBottomNavigationAction value="/users" label="Usuarios" icon={<People />} />
            <StyledBottomNavigationAction value="/notifications" label="Notificaciones" icon={<Notifications />} />
            <StyledBottomNavigationAction value="/profile" label="Perfil" icon={<Person />} />
        </BottomNavigation>
    );
}