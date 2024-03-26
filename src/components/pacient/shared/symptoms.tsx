import { Accordion, AccordionDetails, AccordionSummary, Box, Button, TextField } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from "react";
import {postSymptoms} from "@/actions/postActions";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
interface DataState {
  description: string;
  symptom: string;
  when: string;
}
interface SymptomsProps {
  specialist: string;
  pacient: string;
}

export const Symptoms = ({ specialist, pacient }: SymptomsProps) => {
  const [symptom, setSymptom] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [when, setWhen] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationData, setNotificationData] = useState<{ message: string; severity: "error" | "success" | "warning" }>({ message: '', severity: 'success' });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState: React.Dispatch<React.SetStateAction<string>>, field: keyof DataState) => {
    const { value } = event.target;
    setState(value);
  };

  const handleSubmit = async () => {
    if (!symptom || !description || !when) {
      setError(true);
    } else {
      setError(false);
      const response = await postSymptoms(symptom, description, when, specialist);
      if (response.status === 200) {
        setOpenNotification(true);
        setNotificationData({ message: 'Síntoma registrado correctamente', severity: 'success' });
        setSymptom('');
        setDescription('');
        setWhen('');
      } else {
        setOpenNotification(true);
        setNotificationData({ message: 'Error al registrar el síntoma', severity: 'error' });
      }
    }
  }

  return (
    <>
      <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        onClose={() => setOpenNotification(false)}
      >
        <Alert variant="filled" onClose={() => setOpenNotification(false)} severity={notificationData.severity}>
          {notificationData.message}
        </Alert>
      </Snackbar>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          Síntomas
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" alignItems="center" gap={4} p={2}>
            <div className="">
              <TextField
                id="outlined-basic"
                label="Nombre del síntoma"
                variant="outlined"
                name="symptom"
                value={symptom}
                onChange={(e) => handleInputChange(e, setSymptom, 'symptom')}
                className="w-full"
                required
                error={error && !symptom}
              />
              <TextField
                id="outlined-basic"
                label="Descripción del síntoma"
                variant="outlined"
                name="description"
                value={description}
                onChange={(e) => handleInputChange(e, setDescription, 'description')}
                className="w-full"
                required
                error={error && !description}
              />
              <TextField
                id="outlined-basic"
                label="Cuándo apareció el síntoma?"
                variant="outlined"
                name="when"
                value={when}
                onChange={(e) => handleInputChange(e, setWhen, 'when')}
                className="w-full"
                required
                error={error && !when}
              />
            </div>
           
              <Button onClick={handleSubmit} component="label" role={undefined} variant="contained" tabIndex={-1}>
                Registrar síntoma
              </Button>
            
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
