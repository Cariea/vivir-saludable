"use client";

import { getChatMessages, getUserInfo } from "@/actions/getActions";
import MessageBubble from "@/components/MessageBubble";
import { ChatContext, SessionCookiesContext } from "@/contexts";
import { useChatScroll } from "@/hook/useChatScroll";
import { StoredMessage, User } from "@/types";
import { ChevronLeftRounded, SearchRounded, SendRounded } from "@mui/icons-material";
import {
    Stack,
    Typography,
    useTheme,
    IconButton,
    styled,
    Button,
    Avatar,
    Input,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useRef, useState } from "react";

const ChatInput = styled(Input)(({ theme }) => ({
    padding: "0.5rem",
    borderRadius: "2rem",
    border: 0,
    boxShadow: "none",
    width: "100%",
    fontSize: "14px",
    backgroundColor: "white",
    minHeight: "3rem",
    maxHeight: "5rem",
    lineHeight: "inherit",
    overflowY: "auto",
    "::placeholder": {
        color: theme.palette.grey["200"],
    },
    "&::before": {
        border: 0,
    },
    "&:after": {
        border: 0,
    },
    "&:hover:not(.Mui-disabled, .Mui-error):before": {
        border: 0,
    },
    "input.MuiInputBase-input": {
        padding: 0,
    },
}));

export default function ChatPage({
    params,
    searchParams,
}: {
    params: { receiverId: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const { messages: chatMessages, socket } = useContext(ChatContext);
    const [inputValue, setInputValue] = useState<string>("");
    const [messages, setMessages] = useState<StoredMessage[]>([]);
    const [currentMessageCount, setCurrentMessageCount] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const router = useRouter();
    const [session, setSession] = useState<{ id: string }>({} as any);
    const cookie = useContext(SessionCookiesContext);


    const Scroll = () => {
        const { offsetHeight, scrollHeight, scrollTop } = container.current as HTMLDivElement;
        if (scrollHeight <= scrollTop + offsetHeight + 100) {
            container.current?.scrollTo(0, scrollHeight);
        }
    };

    useEffect(() => {
        setSession(JSON.parse(cookie.value));
    }, []);

    useEffect(() => {
        const getData = async () => {
            const response = await getChatMessages({
                toUserId: params.receiverId,
            });

            if (response.status === 200) {
                console.log(response.data);
                setMessages(response.data);
            }
        };

        getData();
    }, [params.receiverId]);

    useEffect(() => {
        Scroll();
    }, [messages, chatMessages]);

    const sortedMessages = useMemo(() => {
        if (messages.length) {
            const result = [...messages, ...chatMessages].sort(
                (a: StoredMessage, b: StoredMessage) => {
                    const aDate = new Date(a.createdAt);
                    const bDate = new Date(b.createdAt);

                    if (aDate.getTime() < bDate.getTime()) {
                        return -1;
                    }

                    if (aDate.getTime() === bDate.getTime()) {
                        return 0;
                    }

                    return 1;
                }
            );

            console.log(result);

            return result;
        }
        return [];
    }, [messages, chatMessages]);

    
    const container = useChatScroll(sortedMessages);

    return (
        <div className="overflow-hidden h-screen">
            <Stack
                direction="row"
                justifyContent="space-between"
                color="white"
                fontWeight="bold"
                className="bg-primary-default p-2 text-white w-full"
                alignItems="center"
            >
                <IconButton aria-label="Back" sx={{ color: "white" }} onClick={() => router.back()}>
                    <ChevronLeftRounded className="size-4" />
                </IconButton>
                <Typography variant="h6">{searchParams.name}</Typography>

                <IconButton aria-label="Search" sx={{ color: "white" }}>
                    <SearchRounded className="size-4" />
                </IconButton>
            </Stack>
            <div
                ref={container}
                className="min-h-[calc(100vh-9rem)] max-h-[calc(100vh-10.5rem)] overflow-auto flex flex-col p-4 pt-3 first:mt-0"
            >
                {sortedMessages.map((message,index) => (
                    <MessageBubble
                        key={index}
                        type={session.id === message.userId ? "sender" : "receiver"}
                        text={message.message}
                        timestamp={message.createdAt}
                    />
                ))}
            </div>
            <Stack
                direction="column"
            >
                <div className="pl-4 pr-2 pt-2 pb-10 bg-primary-default w-full flex items-center">
                <ChatInput
                    multiline
                    inputProps={{ maxLength: 250 }}
                    value={inputValue}
                    maxRows={2}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    sx={{ fontSize: "1rem",marginTop: "0.7rem"}}
                    placeholder="Escribe Tu Mensaje..."
                />
                <IconButton
                    aria-label="Send"
                    color="secondary"
                    sx={{ width: "2.25rem", height: "2.25rem",marginTop: "0.7rem"}}
                    onClick={() => {
                        if(inputValue.length !== 0) {
                            socket.emit("chat message", {
                                text: inputValue,
                                from: session.id,
                                to: params.receiverId,
                            });
    
                            setMessages((prev) => [
                                ...prev,
                                {
                                    createdAt: new Date().toISOString(),
                                    message: inputValue,
                                    userId: session.id,
                                    userReceptor: params.receiverId,
                                },
                            ]);
    
                            setInputValue("");
                            setCurrentMessageCount(currentMessageCount + 1);
                        }
                    }}
                >
                    <SendRounded />
                </IconButton>
                </div>
            </Stack>
        </div>
    );
}
