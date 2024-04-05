'use client'

import { SessionCookiesContext } from "@/contexts";
import { CalendarMonthRounded, CheckRounded, MessageRounded, Notifications, NotificationsRounded, People, PeopleRounded, Person, PersonRounded } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, styled } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

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
    const [session, setSession] = useState<{ role: string,id:string  }>({} as any);
    const cookie = useContext(SessionCookiesContext);

    useEffect(() => {
        setSession(JSON.parse(cookie.value));
    }, [])

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
            {/* {session.role !== "asistent" && <StyledBottomNavigationAction value="/consults" label="Consultas" icon={<CalendarMonthRounded />} />} */}
            {session.role === "specialist" && <StyledBottomNavigationAction value="/pacients" label="Pacientes" icon={<People />} />}
            {session.role === "pacient" && <StyledBottomNavigationAction value="/todo" label="Todo" icon={<CheckRounded />} />}
            {session.role !== "asistent" && <StyledBottomNavigationAction value="/chat" label="Chat" icon={<MessageRounded />} />}
            {session.role === "pacient" && <StyledBottomNavigationAction value="/specialists" label="Especialistas" icon={<People />} />}
            <StyledBottomNavigationAction value="/notifications" label="Alertas" icon={<NotificationsRounded />} />
            {session.role ==="specialist" && <StyledBottomNavigationAction value={"/profile/"+session.id} label="Perfil" icon={<PersonRounded />} />}
            {session.role ==="pacient" && <StyledBottomNavigationAction value={"/profile/"+session.id} label="Perfil" icon={<PersonRounded />} />}
        </BottomNavigation>
    );
}