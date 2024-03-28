'use client'
import {  getMeSpecialist, getPacient } from "@/actions/getActions"
import Navbar from "@/components/Navbar"
import { Specialist } from "@/types"
import { useEffect, useState } from "react"
import SimplePacientCard, { PacientSpecialists } from "@/components/SimplePacientCard"

import MealCard from "@/components/specialist/nutricionist/MealCard"
import { set } from "react-hook-form"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const PacientPage =  ({ params }: { params: { pacientId: string} })  => {

    const [currentSpecialist, setCurrentSpecialist] = useState({}as Specialist)
    const [currentPacient, setCurrentPacient] = useState({} as PacientSpecialists)
    const [dates, setDates] = useState([] as unknown[])
    const getDistinctDatesFromMeals = (patient:PacientSpecialists) => {
        const datesSet = new Set();
        patient.meals.forEach((meal) => {
            const date = meal.createdAt.split(" ")[0];
            datesSet.add(date);
        });
        return Array.from(datesSet);
    };

    const getUserData = async () => {
        const response = await getMeSpecialist()
        const response2 = await getPacient(params.pacientId)

        if (response.status === 200 && response2.status === 200) {
            setCurrentSpecialist(response.data)
            setCurrentPacient(response2.data)
            setDates(getDistinctDatesFromMeals(response2.data))
        }
      
    }
 

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <div style={{ maxHeight: 'calc(100vh - 9rem)', overflowY: 'auto' }}>
            <SimplePacientCard user={currentPacient} pacientId={params.pacientId} />
            {currentSpecialist.specialtyName === "nutricionista" && dates.map((date,index) => {
                return(
                    <div key={index}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                        <Typography variant="h6">Comidas del: {date as string}</Typography>
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
            <Navbar />
        </div>
    )
}

export default PacientPage