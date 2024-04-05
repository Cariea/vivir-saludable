import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import Image from 'next/image';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { getIngredientsByMeal } from "@/actions/getActions";
import { Ingredient } from "@/types";
import { Padding } from '@mui/icons-material';
interface PaginatedIngredients {
  items: Ingredient[];
}


const MealCard = ({props}:{props: {mealId:number, description:string, mealImage:string, pica:boolean, satisfied:boolean, date:string} }) => {
 const [ingredients, setIngredients] = useState<PaginatedIngredients>({items: [] as Ingredient[]});
 const fetchIngredients = async () => { 
  const response = await getIngredientsByMeal(props.mealId)
  if(response.status === 200) {
    setIngredients(response.data)
  }
 }
  
  useEffect(() => {
    fetchIngredients()
  }, [])
  return (
    <Box className="bg-white shadow-base rounded-3xl overflow-hidden mb-4"> 
      <Stack direction="row" justifyContent="space-between">

        <Box style={{ width: '50%', paddingRight: '16px' }}>
          <Image src={props.mealImage} alt="Thumbnail" width={300} height={400}/>
        </Box>

        <Box style={{ width: '50%', display: 'flex', flexDirection: 'column', paddingBottom: '6px', paddingTop: '6px' }}>
          <Typography  variant="h6" color="primary" fontWeight="bold">{props.description}</Typography>
          <Typography  variant="caption">{props.pica ? "Fuera del plan alimenticio" : "Dentro del plan alimenticio"}</Typography>
          <Typography  variant="caption">{props.satisfied ? "Quede satisfecho" : "No quede satisfecho"}</Typography>
          <Typography variant="caption">
            Hora de registro: {props.date.replace(/^\d{2}\/\d{2}\/\d{4}\s/, '')}
          </Typography>
        </Box>

      </Stack>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h6">Ingredientes</Typography>
        </AccordionSummary>
      <AccordionDetails>
      
         <TableContainer component={Paper}>
         <Table sx={{ maxWidth: 600 }} size="small" aria-label="a dense table">
           <TableHead>
             <TableRow sx={{justifyContent: 'space-between'}}>
               <TableCell align="left">Nombre</TableCell>
               <TableCell align="right">Peso&nbsp;(g)</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
           {ingredients.items.map((ingredient: Ingredient, index) => (
               <TableRow
                 key={ingredient.ingredientId}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
               >
                 <TableCell component="th" scope="row">
                   {ingredient.name}
                 </TableCell>
                 <TableCell align="right">{ingredient.volume}</TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>

      </AccordionDetails>
    </Accordion>
    </Box>
  )
}

export default MealCard;
