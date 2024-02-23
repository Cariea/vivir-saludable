"use client";

import Image from "next/image";

import { useContext, useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";

import { User } from "@/types";
import { getUsers } from "@/actions/getActions";

import UserCard from "@/components/UserCard";
import Navbar from "@/components/Navbar"
import UserFilter from "@/components/UserFilter";

import Loading from "./loading";

import Logo from "@/images/Logo.png";

export default function UserList() {
    const [filterSelection, setFilterSelection] = useState<Object>({});
    const [searchInput, setSearchInput] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [userPageSize, setUserPageSize] = useState(5);
    const [userPage, setUserPage] = useState(1);

    const getUserData = async () => {
        const response = await getUsers({ size: userPageSize, page: userPage });

        if (hasMore && response.status === 200) {
            setUsers([...users, ...response.data.items]);
            setUserPage(userPage + 1);

            if (userPage >= response.data.paginate.pages) {
                setHasMore(false);
            }
        } else {
            setHasMore(false);
        }
    };

    const searchedUserItems = useMemo(
        () =>
            users.filter(
                (user) => user.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
            ),
        [users, searchInput]
    );

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            <Navbar selected="users" />
            <Image src={Logo} alt="Logo" className="size-8" />
            <div className="flex justify-between items-end gap-x-4 mt-4">
                <div className="relative flex items-center w-full">
                    <IoSearch className="absolute size-base ml-4 text-gray-200 left-0 focus:outline-none rtl:right-0 rtl:left-auto" />
                    <div className="flex flex-col gap-y-2 w-full">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="block input h-14 w-full left-icon"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </div>
                <UserFilter selection={filterSelection} setSelection={setFilterSelection} />
            </div>
            <InfiniteScroll
                dataLength={searchedUserItems.length}
                hasMore={hasMore}
                next={getUserData}
                loader={<Loading />}
                className="pb-32 mt-8"
                endMessage={
                    <span className="mt-4 text-sm text-gray-400 block text-center">
                        No hay más resultados.
                    </span>
                }
            >
                <div className="flex flex-col gap-y-8">
                    {searchedUserItems.map((user: User) => (
                        <UserCard user={user} key={user.userId} />
                    ))}
                </div>
            </InfiniteScroll>
        </>
    );
}
