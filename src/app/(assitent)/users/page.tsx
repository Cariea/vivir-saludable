"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fab } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { User } from "@/types";
import { getUsers } from "@/actions/getActions";

import { withRoles } from "@/components/WithRolesWrapper";
import UserCardDesc from "@/components/UserCardDes";
import Navbar from "@/components/Navbar";
import UserFilter from "@/components/UserFilter";
import SearchInput from "@/components/SearchInput";

import Logo from "@/images/Logo.png";

import Loading from "./loading";

interface SelectionProps {
    byRole?: string;
    bySpecialty?: string[];
    byProgram?: string[];
    byClinicCenter?: string[];
}

const UserList = () => {
    const pathname = usePathname();
    const [filterSelection, setFilterSelection] = useState<SelectionProps>({});
    const [searchInput, setSearchInput] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [userPageSize, setUserPageSize] = useState(5);
    const [userPage, setUserPage] = useState(1);
    const router = useRouter();

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

    const searchedUserItems = useMemo(() => {
        const usersByName = users.filter(
            (user) => user.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
        );

        const usersByRole = usersByName.filter((user) =>
            filterSelection.byRole ? user.role === filterSelection.byRole : true
        );

        const usersBySpecialty = usersByRole.filter((user) => {
            if (!user.especialty || !filterSelection.bySpecialty) return true;

            if (!filterSelection.bySpecialty.length) return false;

            return filterSelection.bySpecialty.includes(user.especialty);
        });

        const usersByProgram = usersByRole.filter((user) => {
            if (!user.program || !filterSelection.byProgram) return true;

            if (!filterSelection.byProgram.length) return false;

            return filterSelection.byProgram.includes(user.program);
        });

        const ids = new Set(usersBySpecialty.map((u) => u.userId));
        const merged = [
            ...(filterSelection.byRole
                ? filterSelection.byRole === "specialist"
                    ? usersBySpecialty
                    : []
                : usersBySpecialty),
            ...(filterSelection.byRole
                ? filterSelection.byRole === "pacient"
                    ? usersByProgram
                    : []
                : usersByProgram.filter((d) => !ids.has(d.userId))),
        ];

        return merged;
    }, [users, searchInput, filterSelection]);

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            <Image src={Logo} alt="Logo" className="size-8" />
            <div className="flex justify-between items-end gap-x-4 mt-4">
                <SearchInput value={searchInput} setValue={setSearchInput} />
                <UserFilter setOriginalSelection={setFilterSelection} />
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
                        <UserCardDesc user={user} key={user.userId} setUpdate={() => {}} />
                    ))}
                </div>
            </InfiniteScroll>
            <div className="absolute">
                <Fab
                    color="secondary"
                    aria-label="add"
                    sx={{ position: "fixed", bottom: "5.5rem", color: "white", right: "1rem" }}
                    onClick={() => router.push("/users/add")}
                >
                    <AddRounded />
                </Fab>
            </div>
            <Navbar />
        </>
    );
};

export default withRoles(UserList, ["asistent"]);
