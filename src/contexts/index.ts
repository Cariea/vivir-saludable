import { createContext } from 'react';

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
