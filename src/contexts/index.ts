import { createContext } from 'react';

export interface UserListContextType {
    selection: Object;
    searchInput: string;
}

export const UserPageContext = createContext<UserListContextType>({} as UserListContextType);