'use client'
import {  getMeSpecialist, getPacient, getSpecialistIndications } from "@/actions/getActions"
import Navbar from "@/components/Navbar"
import { Specialist } from "@/types"
import { useEffect, useState } from "react"
import SimplePacientCard, { PacientSpecialists } from "@/components/SimplePacientCard"

import MealCard from "@/components/specialist/nutricionist/MealCard"
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import { deleteAssingments } from "@/actions/deleteActions"
import { AddIndicationToPacient } from "@/actions/postActions"
interface Indications {
    indicationId: number;
    description: string;
    status: boolean;
}
const PacientPage =  ({ params }: { params: { pacientId: string} })  => {

    const [currentSpecialist, setCurrentSpecialist] = useState({}as Specialist)
    const [currentPacient, setCurrentPacient] = useState({} as PacientSpecialists)
    const [dates, setDates] = useState([] as unknown[])
    const [symptomsDates, setSymptomsDates] = useState([] as unknown[])
    const [indications, setIndications] = useState<Indications[]>([])

    const getDistinctDatesFromMeals = (patient:PacientSpecialists) => {
        const datesSet = new Set();
        patient.meals.forEach((meal) => {
            const date = meal.createdAt.split(" ")[0];
            datesSet.add(date);
        });
        
        return Array.from(datesSet);
    };

    const getDistinctDatesFromSymptoms = (patient:PacientSpecialists) => {
        const datesSet = new Set();
        patient.symptoms.forEach((symptom) => {
            const date = symptom.createdAt.split(" ")[0];
            datesSet.add(date);
        });
        console.log(datesSet)
        
        return Array.from(datesSet);
    }

    const getUserData = async () => {
        const response = await getMeSpecialist()
        const response2 = await getPacient(params.pacientId)
        const response3 = await getSpecialistIndications(params.pacientId)
        console.log(response3.data)
        if (response.status === 200 && response2.status === 200 && response3.status === 200) {
            setCurrentSpecialist(response.data)
            setCurrentPacient(response2.data)
            setIndications(response3.data)

            setDates(getDistinctDatesFromMeals(response2.data))
            setSymptomsDates(getDistinctDatesFromSymptoms(response2.data))
        }
      
    }
 

   
    const handleClick = async (event: React.MouseEvent<unknown>, id: number) => {
      const indication = indications.find(ind => ind.indicationId === id);

      const newStatus = !indication?.status;

      const updatedIndications = indications.map(ind => {
          if (ind.indicationId === id) {
              return { ...ind, status: newStatus };
          }
          return ind;
      });

      if (newStatus) {
          console.log(`Indicación con ID ${id} marcada como asignada`);
          const response = await AddIndicationToPacient(params.pacientId, id);
          console.log(response);
        } else {
        const response = await deleteAssingments(id);
        console.log(response);
      }
      setIndications(updatedIndications);
  };
  

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <div style={{ maxHeight: 'calc(100vh - 9rem)', overflowY: 'auto' }}>
            <SimplePacientCard user={currentPacient} pacientId={params.pacientId} />
            <Box sx={{ width:'100%',display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:'1rem'}}>
              <Typography sx={{ margin: '1rem' }} variant="h6">Indicaciones</Typography>
                <TableContainer  component={Paper} >
                  <Table>
                    <TableHead>
                      <TableRow>
                        
                        <TableCell align="left">       </TableCell>
                        <TableCell align="left">Id</TableCell>
                        <TableCell align="center">Descripcion</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {indications && indications.map((indication) => {
                        return (
                          <TableRow
                            key={indication.indicationId}
                            hover
                            onClick={(event) => handleClick(event, indication.indicationId)}
                            role="checkbox"
                            aria-checked={indication.status}
                            tabIndex={-1}
                            selected={indication.status}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={indication.status}
                              />
                            </TableCell>
                            <TableCell align="left">{indication.indicationId}</TableCell>
                            <TableCell align="center">{indication.description}</TableCell>
                            <TableCell align="right">{indication.status ? "Asignada": "No Asignada"}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            <Box sx={{ display: 'flex',flexDirection:'column', alignItems: 'center', flexWrap: 'wrap'}}>
                {currentSpecialist.specialtyName === "nutricionista" && <Typography sx={{marginBottom:'1rem'}}variant="h6">Comidas</Typography>}
                {currentSpecialist.specialtyName === "nutricionista" && dates.map((date,index) => {
                    return(
                        <div key={index}>
                            <Accordion sx={{ minWidth: 360 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                                    <Typography variant="h6">{date as string}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                {
                                    currentPacient.meals.map((meal,index) => {
                                        if(meal.createdAt.split(" ")[0] !== date) return null
                                        return <MealCard key={meal.mealId}
                                            props={{
                                                mealId: currentPacient.meals[index].mealId || 0,
                                                description:  currentPacient.meals[index].description || "",
                                                mealImage: currentPacient.meals[index].mealImageUrl || "",
                                                pica: currentPacient.meals[index].pica || false,
                                                satisfied: currentPacient.meals[index].wasSafistied || false,
                                                date: currentPacient.meals[index].createdAt || "",
                                            }}
                                        />
                                    })
                                }
                        </AccordionDetails>
                    </Accordion>
                    </div>
                    )

                    
                })}

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ margin: '1rem' }} variant="h6">Síntomas</Typography>
                <div style={{ overflowY: 'auto', flexGrow: 1, maxHeight:330}}>
                    {currentPacient && symptomsDates.map((date, index) => (
                      <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index + 1}-content`} id={`panel${index + 1}-header`}>
                          <Typography variant="h6">{date as string}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <TableContainer component={Paper} sx={{ maxHeight: '300px', overflow: 'auto' }}>
                            <Table size="small" aria-label="a dense table">
                              <TableHead>
                                <TableRow sx={{ justifyContent: 'space-between' }}>
                                  <TableCell align="left">Nombre</TableCell>
                                  <TableCell align="center">Descripción</TableCell>
                                  <TableCell align="right">Cuando Apareció</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {currentPacient.symptoms.map((symptom) => {
                                  if (symptom.createdAt.split(" ")[0] === date)
                                    return (
                                      <TableRow key={symptom.symptomId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                          {symptom.name}
                                        </TableCell>
                                        <TableCell align="center">{symptom.description}</TableCell>
                                        <TableCell align="right">{symptom.whenAppeared}</TableCell>
                                      </TableRow>
                                    );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                </div>
              </Box>

             
            </Box>
            <Navbar />
        </div>
    )
}

export default PacientPage