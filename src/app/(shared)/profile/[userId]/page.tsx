'use client';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from "@/components/Navbar";
import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Alert } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getIndications } from "@/actions/getActions";
import { useEffect, useState } from "react";
import BasicModal from "@/components/BasicModal";
import { deleteIndications } from '@/actions/deleteActions';
import { set } from 'react-hook-form';
interface Indications {
  indicationId: string;
  description: string;
}

const ProfilePage = ({ params }: { params: { userId: string } }) => {
  const [indications, setIndications] = useState<Indications[]>([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationData, setNotificationData] = useState<{ message: string; severity: "error" | "success" | "warning" }>({ message: '', severity: 'success' });
  
  useEffect(() => {
    fetchIndications();
  }, []);
  const handleSnackbarClose = () => setOpenNotification(false);
  const fetchIndications = async () => {
    try {
      const response = await getIndications();
      if (response.status === 200) {
        setIndications(response.data || []);
      } else {
        console.error('Error fetching indications:', response.message);
      }
    } catch (error) {
      console.error('Error fetching indications:', error);
    }
  }
  const handleDelete = async (indicationId: string) => {
    const response = await deleteIndications(indicationId);
    if (response.status === 200) {
      await fetchIndications();
      setOpenNotification(true);
      setNotificationData({ message: 'Indicación eliminada correctamente', severity: 'success' });

    } else {
      setOpenNotification(true);
      setNotificationData({ message: response.message, severity: 'error' });
      console.error(response.message);
    }
  }

  const handleUpdate = async (indicationId: string) => {
    // Aquí puedes poner cualquier lógica que necesites para el manejo de actualización de la indicación
    await fetchIndications();
  }

  const handleModalSubmit = async () => {
    // Aquí puedes poner cualquier lógica que necesites para el manejo de envío del formulario en el modal

    // Después de que se haya enviado exitosamente el formulario, vuelva a cargar las indicaciones
    await fetchIndications();
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          Mis Indicaciones
        </AccordionSummary>
        <AccordionDetails sx={{ maxHeight: '300px', overflowY: 'auto' }}>
          <TableContainer component={Paper} style={{ maxWidth: '520px' }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="right">Descripcion</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                {indications.map((indication) => (
                  <TableRow key={indication.indicationId}>
                    <TableCell align="left" style={{ maxWidth: '100px' }}>{indication.indicationId}</TableCell>
                    <TableCell align="right" style={{ maxWidth: '100px', wordBreak: 'break-all'  }}>{indication.description}</TableCell>
                    <TableCell align="right">
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="flex items-center" onClick={() => handleUpdate(indication.indicationId)}>
                    <ModeIcon />
                  </button>
                  <button className="flex items-center" onClick={() => handleDelete(indication.indicationId)}>
                    <DeleteIcon />
                  </button>
                </div>
              </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <BasicModal onSubmit={handleModalSubmit} userId={params.userId} />
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Navbar />
      <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert variant="filled" onClose={handleSnackbarClose} severity={notificationData.severity} sx={{ width: '100%' }}>
          {notificationData.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProfilePage;
