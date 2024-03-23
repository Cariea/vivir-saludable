import stc from "string-to-color";

export const stringAvatar = (name: string, size: number, fontWeight: number = 700) => {
    const firstLetter = name.split(" ")[0][0];
    const secondLetter = name.split(" ")[1][0];
    return {
        sx: {
            background: `linear-gradient(${stc(firstLetter)},${stc(secondLetter)})`,
            height: size,
            width: size,
            fontWeight,
        },
        children: firstLetter + secondLetter,
    };
};