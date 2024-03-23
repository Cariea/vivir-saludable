"use client";

import { useRouter } from "next/navigation";
import { Avatar, Button, Stack, Typography, useTheme } from "@mui/material";

import { stringAvatar } from "@/utils";

export default function ContactList({ contacts }: { contacts: any[] }) {
    const { palette } = useTheme();
    const router = useRouter();

    return (
        <div className="mb-12">
            {contacts.map((contact) => (
                <>
                    <Button
                        key={contact.userid}
                        onClick={() => router.push(`/chat/${contact.userid}?name=${contact.name}`)}
                        sx={{
                            bgcolor: palette.background.default,
                            padding: "0.5rem 1rem",
                            boxShadow: "none",
                            borderRadius: 0,
                            justifyContent: "start",
                            width: "100%",
                            border: "1px",
                            borderColor: palette.grey[400],
                        }}
                    >
                        <Avatar {...stringAvatar(contact.name, 56)} />
                        <Stack spacing={0.5} width="100%" alignItems="flex-start" ml={1}>
                            <Typography fontWeight="bold">{contact.name}</Typography>
                            <Typography variant="caption" className="text-gray-400">
                                {contact.name}
                            </Typography>
                        </Stack>
                    </Button>
                    <div className="h-[1px] w-[calc(100%-(1.5rem+56px))] bg-gray-50 translate-x-[calc(1.5rem+56px)]" />
                </>
            ))}
        </div>
    );
}
