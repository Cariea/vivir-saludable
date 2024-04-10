"use client";

import Link from "next/link";
import { IoLayers, IoPerson } from "react-icons/io5";

import { User } from "@/types";
import { useRouter } from "next/navigation";
import {
    Box,
    IconButton,

    ListItemIcon,

    Menu,

    MenuItem,

    Stack,
    Typography,
} from "@mui/material";
import { Delete, DeleteRounded, MoreHorizRounded } from "@mui/icons-material";
import { useState } from "react";
import AlertDialog from "./AlertDialogDesc";
import { deleteUsers } from "@/actions/deleteActions";

interface UserCardProps {
    user: User;
    key: string;
    noSpecialist?: boolean;
    noPatient?: boolean;
    noMenu?: boolean;
    setUpdate: (value: boolean) => void;
}

export default function UserCardDesc({
    user,
    noSpecialist,
    noPatient,
    noMenu,
    setUpdate,
}: UserCardProps) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openModal, setModal] = useState<boolean>(false);
    const open = Boolean(anchorEl);
    const handleRouter = () => {
       
      router.push(`/users/${user.userId}`);
     
    };

    const handleMenu = (e: any) => {
        setAnchorEl(e.currentTarget);
    }
    const handleDeleteButton = () => {  
        setModal(true);
    }

    const handleClose = () => {
      setAnchorEl(null);
  };
    const handleDelete =  (info: any) => async () => {
        const response = await deleteUsers(info.userId, info.role);
        setUpdate(true);
    };

    return (
        <Box
            
            className="bg-white shadow-base rounded-3xl w-full p-8 cursor-pointer"
        >
            <Stack direction="row" justifyContent="space-between">
                <Box onClick={handleRouter}>
                    <Typography variant="caption" className="text-gray-400">
                        {user.role === "specialist" ? user.especialty : "Paciente"}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        {user.name}
                    </Typography>
                </Box>
                {!noMenu && (
                    <>
                        <IconButton
                            id={`user-submenu-button-${user.userId}`}
                            className="text-gray-400"
                            aria-controls={open ? `user-submenu-${user.userId}` : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleMenu}
                        >
                            <Delete className="text-gray-400" />
                        </IconButton>
                        <Menu
                            id={`user-submenu-${user.userId}`}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": `user-submenu-button-${user.userId}`,
                            }}
                        >
                            <MenuItem color="danger" onClick={handleDeleteButton}>
                                <ListItemIcon>
                                    <DeleteRounded fontSize="small" />
                                </ListItemIcon>
                                Eliminar
                            </MenuItem>
                        </Menu>
                        <AlertDialog
                            color="error"
                            open={openModal}
                            setOpen={setModal}
                            text="Toda información relacionada, como consultas, tareas diarias y similares será eliminada"
                            title="¿Está seguro que desea eliminar este usuario?"
                            action={handleDelete(user)}
                        />
                    </>
                )}
            </Stack>
            {user.status ? (
                <div className="flex gap-x-2 items-center">
                    <div className="w-3 h-3 bg-secondary-default rounded-full"></div>
                    <span className="text-secondary-default text-sm">Activo</span>
                </div>
            ) : (
                <div className="flex gap-x-2 items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-500 text-sm">Inactivo</span>
                </div>
            )}
            <div
                className={`flex justify-end gap-x-2 items-end ${
                    noSpecialist && noPatient ? "" : "mt-8"
                }`}
            >
                {user.role === "specialist" ? (
                    <>
                        {!noSpecialist && (
                            <div className="flex gap-x-1 items-center text-gray-400">
                                <IoLayers className="w-4 h-4" />
                                <span className="text-xs">{user.programs} Programas</span>
                            </div>
                        )}
                        {!noPatient && (
                            <div className="flex gap-x-1 items-center text-gray-400">
                                <IoPerson className="w-4 h-4" />
                                <span className="text-xs">{user.pacients} Pacientes</span>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {!noPatient && (
                            <div className="flex gap-x-1 items-center text-gray-400">
                                <IoLayers className="w-4 h-4" />
                                <span className="text-xs">{user.program}</span>
                            </div>
                        )}
                        {!noSpecialist && (
                            <div className="flex gap-x-1 items-center text-gray-400">
                                <IoPerson className="w-4 h-4" />
                                <span className="text-xs">{user.especialists} Especialistas</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Box>
    );
}
