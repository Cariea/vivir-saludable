import { getIndicationsComplianceReports } from "@/actions/getActions"
import { useEffect, useState } from "react"

import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Checkbox, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { postAlert } from "@/actions/postActions";

interface Indication {
  recordId: number,
  indicationId: number,
  description: string,
  completed: boolean,
  date: string,
  hour: string
}
export const Compliance = ({params}: {params:{userId:string}}) => {
  const [indications, setIndications] = useState<Indication[]>([])
  const [dates, setDates] = useState<string[]>([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationData, setNotificationData] = useState<{ message: string; severity: "error" | "success" | "warning" }>({ message: '', severity: 'success' });

  const handleSnackbarClose = () => setOpenNotification(false);
  const getDistinctDatesFromIndications = (indications:Indication[]) => {
    const datesSet = new Set();
    indications.forEach((indication) => {
        const date = indication.date.split(" ")[0];
        datesSet.add(date);
    });
    
    return Array.from(datesSet);
};
const fetchIndications = async () => {
  const response = await getIndicationsComplianceReports(params.userId)

  if (response.status === 200) {
    setIndications(response.data);
    if (Array.isArray(response.data) && response.data.every(item => typeof item === 'object' && 'date' in item)) {
      setIndications(response.data as Indication[]);
      setDates(getDistinctDatesFromIndications(response.data as Indication[]) as string[]);
    } else {
      console.log('Los datos de respuesta no están en el formato esperado.');
    }
  }
}
const sendAlert = async(indication:Indication,type:string) => {
  let alert = ''
  if (type === 'congrats') {
     alert = `Felicitaciones por completar la indicación "${indication.description}". Siga así.`
  }else{
     alert = `No ha completado la indicación "${indication.description}" Es importante para su salud que cumpla con todas las indicaciones asingnadas.`
  }

  const response =  await postAlert(params.userId,alert,type)
  if (response.status === 200) {
    setOpenNotification(true);
    setNotificationData({ message: 'Notificacion enviada con exito', severity: 'success' });
  }
}

  useEffect(() => {
    fetchIndications()
   

  }, [])

  return(
    <> 
     
     <Box sx={{width:'100%'}} >
     <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert variant="filled" onClose={handleSnackbarClose} severity={notificationData.severity} sx={{ width: '100%' }}>
          {notificationData.message}
        </Alert>
      </Snackbar>
     <Typography sx={{ margin: '1rem', textAlign: 'center'  }} variant="h6">Cumplimiento de asignaciones</Typography>
      {dates.map((date) => (
        <Accordion key={date} sx={{width:'100%'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h6">{date as string}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer  component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Indication</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>Completed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {indications.map((indication) => {
                  if (indication.date.split(" ")[0] === date) {
                    return (
                      <TableRow key={indication.recordId}>
                        <TableCell>{indication.description}</TableCell>
                        <TableCell>{indication.completed ? indication.hour : '--'}</TableCell>
                        <TableCell onClick={ () => sendAlert( indication, indication.completed ? 'congrats': 'warning' )} sx={{ textAlign: 'center' }}>
                        <Tooltip title={indication.completed ? 'Enviar Felicitaciones': 'Enviar Advertencia'} placement="right-start">
                          {indication.completed ? <CheckIcon style={{ color: 'green' }} /> : <DangerousIcon style={{ color: 'red' }} />}
                        </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return null;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
    </>
  )
}
