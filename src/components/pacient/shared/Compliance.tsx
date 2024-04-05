import { getIndicationsComplianceReports } from "@/actions/getActions"
import { useEffect, useState } from "react"

import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Paper from '@mui/material/Paper';
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
      console.error('Los datos de respuesta no están en el formato esperado.');
    }
  }
}

  useEffect(() => {
    fetchIndications()
   

  }, [])

  return(
    <> 
     
     <Box  >
     <Typography sx={{ margin: '1rem', textAlign: 'center'  }} variant="h6">Cumplimiento de asignaciones</Typography>
      {dates.map((date) => (
        <Accordion key={date}>
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
                        <TableCell sx={{ textAlign: 'center' }}>
                          {indication.completed ? <CheckIcon style={{ color: 'green' }} /> : <DangerousIcon style={{ color: 'red' }} />}
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
