import { StoredMessage } from '@/types';
import { createContext } from 'react';
import { Socket } from "socket.io-client";

export interface UserListContextType {
    selection: Object;
    searchInput: string;
}

export const UserPageContext = createContext<UserListContextType>({} as UserListContextType);

export interface SessionCookies {
    id: string,
    name: string,
    role: string,
    token: string
}

export const SessionCookiesContext = createContext<any>({} as any);

export interface ChatContextType {
    messages: StoredMessage[],
    socket: Socket
}

export const ChatContext = createContext<ChatContextType>({} as ChatContextType);