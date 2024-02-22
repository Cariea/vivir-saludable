"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { User } from "@/types";
import { UserPageContext } from "@/contexts";
import { getUsers } from "@/actions/getActions";

import Loading from "./loading";
import UserCard from "@/components/UserCard";

export default function UserList() {
    const { searchInput, selection } = useContext(UserPageContext);
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
