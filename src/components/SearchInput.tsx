import { SearchRounded } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";

export default function SearchInput({
    value,
    setValue,
    noShadow
}: {
    noShadow?: boolean;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}) {
    return (
        <div className="relative flex items-center w-full">
            <SearchRounded className="absolute size-base ml-4 text-gray-200 left-0 focus:outline-none rtl:right-0 rtl:left-auto" />
            <div className="flex flex-col gap-y-2 w-full">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className={`block rounded-full pl-12 shadow-base placeholder-gray-200 focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40 h-14 w-full left-icon ${noShadow ? "shadow-none" : ""}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    );
}
