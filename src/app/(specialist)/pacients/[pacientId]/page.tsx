'use client'
import {  getMeSpecialist, getPacient } from "@/actions/getActions"
import Navbar from "@/components/Navbar"
import { Specialist } from "@/types"
import { useEffect, useState } from "react"
import SimplePacientCard, { PacientSpecialists } from "@/components/SimplePacientCard"

import MealCard from "@/components/specialist/nutricionist/MealCard"
import { Accordion, AccordionDetails, AccordionSummary, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
const PacientPage =  ({ params }: { params: { pacientId: string} })  => {

    const [currentSpecialist, setCurrentSpecialist] = useState({}as Specialist)
    const [currentPacient, setCurrentPacient] = useState({} as PacientSpecialists)
    const [dates, setDates] = useState([] as unknown[])
    const [symptomsDates, setSymptomsDates] = useState([] as unknown[])

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

        if (response.status === 200 && response2.status === 200) {
            setCurrentSpecialist(response.data)
            setCurrentPacient(response2.data)
            console.log(response2.data)
            setDates(getDistinctDatesFromMeals(response2.data))
            setSymptomsDates(getDistinctDatesFromSymptoms(response2.data))
        }
      
    }
 

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <div style={{ maxHeight: 'calc(100vh - 9rem)', overflowY: 'auto' }}>
            <SimplePacientCard user={currentPacient} pacientId={params.pacientId} />
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

                <Box sx={{ display: 'flex',flexDirection:'column', alignItems: 'center', flexWrap: 'wrap',}}>
                    <Typography sx={{margin:'1rem'}}variant="h6">Sintomas</Typography>
                    {
                        currentPacient && symptomsDates.map((date,index) => {
                            return(
                                <div key={index}>
                                    <Accordion sx={{ minWidth: 360 }}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                                            <Typography variant="h6">{date as string}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <TableContainer component={Paper} sx={{ maxHeight: '300px', overflow: 'auto' }}>
                                                <Table size="small" aria-label="a dense table">
                                                    <TableHead>
                                                        <TableRow sx={{ justifyContent: 'space-between' }}>
                                                            <TableCell align="left">Nombre</TableCell>
                                                            <TableCell align="center" >Descripción</TableCell>
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
                                </div>

                            )
                        })
                    }
                </Box>
            </Box>
            <Navbar />
        </div>
    )
}

export default PacientPage