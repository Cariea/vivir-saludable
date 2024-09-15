import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material"

interface SymptomsTableProps {
  symptoms: {description:string, name:string, specialistId:string, symptomId:number, whenAppeared:string, createdAt:string}[],
  currentSpecialist: string
}
const SymptomsTable = (symptoms: SymptomsTableProps) => {
    return (      
      symptoms.symptoms.map((symptom,index) => {
          
        if(symptom.createdAt.split(" ")[0] !== symptom.createdAt) return null
        if(symptom.specialistId !== symptoms.currentSpecialist) return null
        return (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Typography variant="h6">{symptom.name}</Typography>
            <Typography variant="h6">{symptom.description}</Typography>
            <Typography variant="h6">{symptom.specialistId}</Typography>
            <Typography variant="h6">{symptom.createdAt}</Typography>
        </Box>
        )
      })
    )
}


export default SymptomsTable