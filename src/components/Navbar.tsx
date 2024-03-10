'use client'

import { SessionCookiesContext } from "@/contexts";
import { CalendarMonthRounded, CheckRounded, MessageRounded, Notifications, NotificationsRounded, People, PeopleRounded, Person, PersonRounded } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, styled } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

type NavbarProps = {
    selected: string;
}

const StyledBottomNavigationAction = styled(BottomNavigationAction)({
    color: "#7898BA",
    '&.Mui-selected': {
        color: '#32c5a3'
    }
})

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const session = useContext(SessionCookiesContext);

    return (
        <BottomNavigation
            showLabels
            value={pathname}
            onChange={(event, newValue) => {
                router.push(newValue);
            }}
            className="fixed bottom-0 left-0 right-0"
        >
            {session.role === "asistent" && <StyledBottomNavigationAction value="/users" label="Usuarios" icon={<PeopleRounded />} />}
            {session.role !== "asistent" && <StyledBottomNavigationAction value="/todo" label="Todo" icon={<CheckRounded />} />}
            {session.role !== "asistent" && <StyledBottomNavigationAction value="/consults" label="Consultas" icon={<CalendarMonthRounded />} />}
            {session.role !== "asistent" && <StyledBottomNavigationAction value="/chat" label="Chat" icon={<MessageRounded />} />}
            <StyledBottomNavigationAction value="/notifications" label="Notificaciones" icon={<NotificationsRounded />} />
            <StyledBottomNavigationAction value="/profile" label="Perfil" icon={<PersonRounded />} />
        </BottomNavigation>
    );
}