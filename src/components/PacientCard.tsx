"use client";
import { IoLayers } from "react-icons/io5";
import { User } from "@/types";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {postConsultation} from '@/actions/postActions';

import { useRouter } from "next/navigation";
import { useState } from "react";

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface UserCardProps {
    user: User;
    key: string;
    noSpecialist?: boolean;
    noPatient?: boolean;
    noMenu?: boolean;
    setUpdate: (value: boolean) => void;
}

export default function PacientCard({
    user,
    noSpecialist,
    noPatient,
}: UserCardProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<Dayjs | null>(dayjs('2024-04-17'));

    const [openNotification, setOpenNotification] = useState(false);
    const [notificationData, setNotificationData] = useState<{ message: string; severity: "error" | "success" | "warning" }>({ message: '', severity: 'success' });
    const handleOpen = () => setOpen(true);
    
    const handleClose = () => {
      setOpen(false)

    };
    const handleSelectDate = async() => {
      setOpen(false);
      const response = await postConsultation(user.userId, dayjs(value).format('YYYY-MM-DD'));
      if(response.status === 200){
        setOpenNotification(true);
        setNotificationData({ message: `Consulta programada correctamente para el ${dayjs(value).format('YYYY-MM-DD')}`, severity: 'success' });
      }else
      {
        setOpenNotification(true);
        setNotificationData({ message: `Error al programar la consulta`, severity: 'error' });
      }
    };



    const handleRouter = (e: any) => {
        //console.log(e);

        if(open === false) {
        switch (e.target.nodeName) {
            case "svg":
                console.log("Icono");
                break;
            case "LI":
                console.log("Listado");
                break;
            case "DIV":
                if (!e.target.className.includes("MuiBackdrop-root")) {
                    router.push(`/pacients/${user.userId}`);
                    console.log("Vamos al detalle de: ", user.userId);
                }
                break;
            default:
                console.log("No hay acciones definidas para este elemento");
        }
    }
    };

    return (
        <Box
            onClick={handleRouter}
            className="bg-white shadow-base rounded-3xl w-full p-8 cursor-pointer"
        >
            <Stack direction="row" justifyContent="space-between">
                <Box>
                    <Typography variant="caption" className="text-gray-400">
                        Paciente
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        {user.name}
                    </Typography>
                </Box>
                
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
                { (
                    <>
                        {!noPatient && (
                            <div className="flex gap-x-1 items-center text-gray-400">
                                <IoLayers className="w-4 h-4" />
                                <span className="text-xs">{user.program}</span>
                            </div>
                        )}
                       
                    </>
                )}
            </div>
            <Button onClick={handleOpen}>Programar Consulta</Button>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Seleccione la fecha de la consulta
          </Typography>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
              <DemoItem >
                <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>

          <Button onClick={handleSelectDate}>Programar</Button>

        </Box>
      </Modal>
      <Snackbar open={openNotification} autoHideDuration={6000} onClose={() => setOpenNotification(false)}>
            <Alert variant="filled" onClose={() => setOpenNotification(false)} severity={notificationData.severity} sx={{ width: '100%' }}>
                {notificationData.message}
            </Alert>
        </Snackbar>
        </Box>
    );
}
