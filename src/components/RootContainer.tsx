'use client';
import { SessionCookiesContext } from "@/contexts";
import { Container } from "@mui/material";


export default function RootContainer({ cookies, children }: any) {
    
    return (
        <SessionCookiesContext.Provider value={cookies}>
            <Container maxWidth="sm">
                {children}
            </Container>
        </SessionCookiesContext.Provider>
    );
}