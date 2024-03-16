'use client'

import { Notifications, People, Person,HealthAndSafety} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { FaUserDoctor } from "react-icons/fa6";
type NavbarProps = {
    selected: string;
}

const StyledBottomNavigationAction = styled(BottomNavigationAction)({
    color: "#7898BA",
    '&.Mui-selected': {
        color: '#32c5a3'
    }
})

export default function PacientNavbar({ selected }: NavbarProps) {
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
            <StyledBottomNavigationAction value="/specialists" label="Especialistas" icon={<HealthAndSafety />} />
            <StyledBottomNavigationAction value="/todo" label="Tareas" icon={<Person />} />
        </BottomNavigation>
    );
}