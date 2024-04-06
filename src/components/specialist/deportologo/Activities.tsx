import { useEffect, useState } from "react"

import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Paper from '@mui/material/Paper';
import { getActivities } from "@/actions/getActions";

interface Activity {
  activityId: number;
  name: string;
  hour: string;
  time?: number;
  distance?: number;
  weight?: number;
  repetitions?: number;
  description: string;
  heartRate?: number;
  date: string;
}
export const ActivitiesTable = ({params}: {params:{userId:string}}) => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [dates, setDates] = useState<string[]>([]);

  const getDistinctDatesFromActivities = (activities:Activity[]) => {
    const datesSet = new Set();
    activities.forEach((activity) => {
        const date = activity.date.split(" ")[0];
        datesSet.add(date);
    });
    
    return Array.from(datesSet);
};

const fetchActivities = async () => {
  const response = await getActivities(params.userId)

  if (response.status === 200) {
    setActivities(response.data);
    console.log('hola')
    if (Array.isArray(response.data) && response.data.every(item => typeof item === 'object' && 'date' in item)) {
      console.log('holaaa')
      setActivities(response.data as Activity[]);
      setDates(getDistinctDatesFromActivities(response.data as Activity[]) as string[]);
    } else {
      console.error('Los datos de respuesta no están en el formato esperado.');
    }
  }
}

  useEffect(() => {
    fetchActivities()
   

  }, [])

  return(
    <> 
     
     <Box sx={{width:'100%'}}>
     <Typography sx={{ margin: '1rem', textAlign: 'center'  }} variant="h6">Actividades</Typography>
      {dates.map((date) => (
        <Accordion key={date}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
           <Typography variant="h6">{date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>Tiempo (min)</TableCell>
                    <TableCell>Distancia (mts)</TableCell>
                    <TableCell>Peso (gr)</TableCell>
                    <TableCell>Repetición (und)</TableCell>
                    <TableCell>Ritmo cardiaco</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities.filter((activity) => activity.date.split(" ")[0] === date).map((activity) => (
                    <TableRow key={activity.activityId}>
                      <TableCell sx={{padding:1, margin: 0}}>{activity.name}</TableCell>
                      <TableCell sx={{padding:1, margin: 0}}>{activity.description}</TableCell>
                      <TableCell sx={{padding:1, margin: 0}}>{activity.hour || '--'}</TableCell>
                      <TableCell sx={{padding:1, margin: 0}}>{activity.time || '--'}</TableCell>
                      <TableCell sx={{padding:1, margin: 0}}>{activity.distance || '--'}</TableCell>
                      <TableCell sx={{padding:1, margin: 0}}>{activity.weight || '--'}</TableCell>
                      <TableCell sx={{padding:1, margin: 0}}>{activity.repetitions || '--'}</TableCell>
                      <TableCell sx={{padding:1, margin: 0}}>{activity.heartRate || '--'}</TableCell>

                     
                    </TableRow>
                  ))}
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
