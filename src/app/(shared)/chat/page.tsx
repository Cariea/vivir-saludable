"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AddRounded } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Stack, Typography } from "@mui/material";

import { getUserContacts } from "@/actions/getActions";

import SearchInput from "@/components/SearchInput";
import Navbar from "@/components/Navbar";

import Logo from "@/images/Logo.png";
import ContactList from "@/components/ContactList";

export default function ChatListPage() {
    const [searchInput, setSearchInput] = useState<string>("");
    const [contactsList, setContactList] = useState<any[]>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await getUserContacts();

            if (response.status === 200) {
                setContactList(response.data);
            }
        };

        getData();
    }, []);

    return (
        <>
            <Stack
                position="fixed"
                top={0}
                zIndex={50}
                className="bg-white-dark w-full p-4 pb-2"
                direction="row"
                justifyContent="center"
                alignItems="center"
                mb={2}
            >
                <Image src={Logo} alt="Logo" className="size-8 absolute left-4 top-4" />
                <Typography variant="h6" component="h4" fontWeight="bold" color="primary">
                    Chats
                </Typography>
            </Stack>
            <div className="mt-20 mb-4 px-4">
                <SearchInput noShadow value={searchInput} setValue={setSearchInput} />
            </div>
            <ContactList contacts={contactsList} />
            <Navbar />
        </>
    );
}

// help please