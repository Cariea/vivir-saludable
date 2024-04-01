import { postSpecialistPacientLink } from "@/actions/postActions";
import { PacientInfoByUser, SpecialistInfoByUser, User, UserInfoByAssitent } from "@/types";
import { Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useReducer, useState } from "react";

enum SelectorKind {
    SELECT = "SELECT",
    UNSELECT = "UNSELECT",
}

interface SelectorAction {
    type: SelectorKind;
    payload: string;
}

interface SelectorState {
    selectedUsers: string[];
}

function reducer(state: SelectorState, action: SelectorAction) {
    const { type, payload } = action;

    switch (type) {
        case SelectorKind.SELECT:
            return {
                ...state,
                selectedUsers: [...state.selectedUsers, payload],
            };
        case SelectorKind.UNSELECT:
            return {
                ...state,
                selectedUsers: state.selectedUsers.filter((user) => user !== payload),
            };
        default:
            return state;
    }
}

export default function UserSelector({
    list,
    inputText,
    setUpdate,
    user,
    toggleDrawer
}: {
    list: User[];
    inputText: string;
    setUpdate: (value: boolean) => void;
    user: UserInfoByAssitent;
    toggleDrawer: any;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const [state, dispatch] = useReducer(reducer, {
        selectedUsers: [],
    });

    const handleSelect = (id: string) => () => {
        if (state.selectedUsers.includes(id)) {
            dispatch({ type: SelectorKind.UNSELECT, payload: id });
        } else {
            dispatch({ type: SelectorKind.SELECT, payload: id });
        }
    };

    const handleAdd = async () => {
        setLoading(true);
        try {
            for(let id of state.selectedUsers) {
                console.log(id, user.userId);
                if (!!user.specialty) {
                    await postSpecialistPacientLink(id, user.userId);
                } else {
                    await postSpecialistPacientLink(user.userId, id);
                }
            }
            toggleDrawer(false);
            setUpdate(true);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    return (
        <>
            <Stack spacing={2} marginBottom={13}>
                {list
                    .filter(
                        (user) => user.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1
                    )
                    .map((user) => (
                        <Box
                            className={`shadow-base rounded-3xl p-8 bg-white ${
                                state.selectedUsers.includes(user.userId)
                                    ? "outline outline-2 outline-secondary-default"
                                    : ""
                            }`}
                            key={user.userId}
                            onClick={handleSelect(user.userId)}
                        >
                            <Typography variant="caption" className="text-gray-400">
                                {!!user.especialty ? user.especialty : "Paciente"}
                            </Typography>
                            <Typography variant="h6" fontWeight="bold" color="primary">
                                {user.name}
                            </Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <div className="rounded-full h-2 w-2 bg-secondary-default"></div>
                                <Typography variant="caption" className="text-secondary-default">
                                    Activo
                                </Typography>
                            </Stack>
                        </Box>
                    ))}
            </Stack>
            <Box
                paddingX={2}
                paddingTop={1}
                paddingBottom={4}
                position="fixed"
                bottom={0}
                right={0}
                left={0}
                bgcolor="background.default"
            >
                <Button
                    variant="contained"
                    color="primary"
                    className="shadow-none"
                    fullWidth
                    onClick={handleAdd}
                >
                    {loading ? <CircularProgress size="2rem" color="inherit" /> : "Agregar"}
                </Button>
            </Box>
        </>
    );
}
