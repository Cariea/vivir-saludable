'use client';
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Container } from "@mui/material";

import { ChatMessage, StoredMessage } from "@/types";
import { SessionCookiesContext, ChatContext } from "@/contexts";
import config from "@/config/config";
import { usePathname } from "next/navigation";

export default function RootContainer({ cookies, children }: any) {
    const pathname = usePathname();

    const [messages, setMessages] = useState<StoredMessage[]>([]);
    const [socket, setSocket] = useState({} as Socket);

    useEffect(() => {
        if (!cookies) {
            return;
        }
        const cookie = JSON.parse(cookies.value);
        const client = io(config.apiUrl, {
            query: {
                userId: cookie.id
            }
        });

        client.on("chat message", (message: ChatMessage) => {
            console.log('Mensaje Recibido: ', message, new Date().toISOString());
            setMessages((prevMessages) => [...prevMessages, {
                createdAt: new Date().toISOString(),
                message: message.text,
                userId: message.from,
                userReceptor: message.to
            }]);
        })

        setSocket(client);

        return () => { //*
            console.log("Disconeccting socket")
            client.disconnect();
            setSocket({} as Socket);
        }//*
    }, [cookies]);

    return (
        <SessionCookiesContext.Provider value={cookies}>
            <ChatContext.Provider value={{ messages, socket }}>
                <Container maxWidth="sm" sx={{ paddingX: 0, paddingY: pathname.includes("chat") ? 0 : '1rem' }}>
                    {children}
                </Container>
            </ChatContext.Provider>
        </SessionCookiesContext.Provider>
    );
}