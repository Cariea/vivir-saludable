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
    <Box className="bg-white shadow-base rounded-3xl overflow-hidden"> 
      <Stack direction="row" justifyContent="space-between">

        <Box style={{ width: '50%', paddingRight: '16px' }}>
          <Image src={props.mealImage} alt="Thumbnail" width={400} height={400}/>
        </Box>

        <Box style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
  <Typography variant="h5">{props.description}</Typography>
  <Typography variant="body1">{props.pica ? "Fuera del plan alimenticio" : "Dentro del plan alimenticio"}</Typography>
  <Typography variant="body1">{props.satisfied ? "Quede satisfecho" : "No quede satisfecho"}</Typography>
  <Typography variant="body1">{props.date}</Typography>
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
             <TableRow>
               <TableCell align="right">Nombre</TableCell>
               <TableCell align="right">Tipo</TableCell>
               <TableCell align="right">Gramos&nbsp;(g)</TableCell>
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
                 <TableCell align="right">{ingredient.ingredientType}</TableCell>
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
