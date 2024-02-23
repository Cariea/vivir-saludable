'use client';

import Image from "next/image";

import Logo from "@/images/Logo.png";
import { IconButton, Stack } from "@mui/material";
import { Help } from "@mui/icons-material";

export default function TodoLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Stack direction='row' justifyContent="space-between" alignItems="center" className="mb-4">
                <Image src={Logo} alt="Logo" className="size-8" />
                <h4 className="font-bold text-primary">Actividades Diarias</h4>
                <IconButton aria-label="help" size="large" sx={{ paddingX: 0 }}>
                    <Help className="text-gray-400" fontSize="inherit" />
                </IconButton>
            </Stack>
            {children}
        </>
    )
}