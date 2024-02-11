"use client";

import { getUsers } from "@/actions/getActions";
import { useContext, useEffect, useMemo, useState } from "react";
import { IoEllipsisHorizontal, IoLayers, IoPerson } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";

import { UserPageContext } from "@/contexts";

import Loading from "./loading";

interface User {
    userId: string;
    name: string;
    email: string;
    role: string;
    especialty: string;
    status: boolean;
    pacients: number;
    especialists: number;
    programs: number;
    program: string;
}

export default function UserList() {
    const { searchInput, selection } = useContext(UserPageContext);
    const [users, setUsers] = useState<User[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [userPageSize, setUserPageSize] = useState(3);
    const [userPage, setUserPage] = useState(1);

    const getUserData = async () => {
        const response = await getUsers({ size: userPageSize, page: userPage });

        console.log(response);

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
        () =>{
            console.log(searchInput);
            const result = users.filter(
                (user) => user.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
            );

            console.log(result);
            return result;
        },
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
                        <div
                            key={user.userId}
                            className="bg-white shadow-base rounded-3xl w-full p-8"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-sm text-gray-400">
                                        {user.role === "specialist" ? user.especialty : "Paciente"}
                                    </span>
                                    <h2 className="text-xl font-bold text-primary mt-1 mb-2 leading-4">
                                        {user.name}
                                    </h2>
                                    {user.status ? (
                                        <div className="flex gap-x-2 items-center">
                                            <div className="w-3 h-3 bg-secondary rounded-full"></div>
                                            <span className="text-secondary text-sm">Activo</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-x-2 items-center">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <span className="text-red-500 text-sm">Inactivo</span>
                                        </div>
                                    )}
                                </div>
                                <button className="btn btn-ghost text-gray-400 p-1 h-auto">
                                    <IoEllipsisHorizontal className="size-6" />
                                </button>
                            </div>
                            <div className="flex justify-end gap-x-2 mt-8 items-end">
                                {user.role === "specialist" ? (
                                    <>
                                        <div className="flex gap-x-1 items-center text-gray-400">
                                            <IoLayers className="w-4 h-4" />
                                            <span className="text-xs">
                                                {user.programs} Programas
                                            </span>
                                        </div>
                                        <div className="flex gap-x-1 items-center text-gray-400">
                                            <IoPerson className="w-4 h-4" />
                                            <span className="text-xs">
                                                {user.pacients} Pacientes
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex gap-x-1 items-center text-gray-400">
                                            <IoLayers className="w-4 h-4" />
                                            <span className="text-xs">{user.program}</span>
                                        </div>
                                        <div className="flex gap-x-1 items-center text-gray-400">
                                            <IoPerson className="w-4 h-4" />
                                            <span className="text-xs">
                                                {user.especialists} Especialistas
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </>
    );
}
