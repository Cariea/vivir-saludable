

import * as React from 'react';
import Box from '@mui/material/Box';
import { Accordion, AccordionDetails, AccordionSummary, TextField, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import { postPacientMeal } from '@/actions/postActions';
import imageCompression from 'browser-image-compression';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { set } from 'react-hook-form';
export interface MealData {
  description: string;
  mealImage: File | '';
  pica: boolean;
  wasSatisfied: boolean;
}
export interface Ingredient {
  name: string;
  quantity: string;
  type: string;
}

export default function MealsBox() {
  const imageToBase64 = async (file:File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  };
  const [openNotification, setOpenNotification] = React.useState(false);
  const [notificationData, setNotificationData] = React.useState<{ message: string; severity: "error" | "success" | "warning" }>({ message: '', severity: 'success' });
  const [mealData, setMealData] = React.useState<MealData>({
    description: '',
    mealImage: '',
    pica: false,
    wasSatisfied: false,
  });

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([] as Ingredient[]);
  const [ingredient, setIngredient] = React.useState<Ingredient>({ name: '', quantity: '', type: '' });
  const [image, setImage] = React.useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMealData({ ...mealData, [name]: value });
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(file instanceof Blob){

      if(file.size > 1048576){
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        try {
          const compressedFile = await imageCompression(file, options);
          setImage(compressedFile);
          setMealData({ ...mealData, mealImage: compressedFile });

        } catch (error) {
          console.log(error);
          setNotificationData({ message: 'Error al comprimir la imagen', severity: 'error' });
          setOpenNotification(true);
        }
      }else{

        setImage(file);
        setMealData({ ...mealData, mealImage: file });
      }
    }
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealData({ ...mealData, [event.target.name]: event.target.checked });
  };

  const handleAddIngredient = () => {
    if (!ingredient.name || !ingredient.quantity){
      setNotificationData({ message: 'Ingrediente incompleto', severity: 'error' });
      setOpenNotification(true);
      return;
    } 
    setIngredients([...ingredients, ingredient]);
    setIngredient({ name: '', quantity: '', type: '' });
  };

  const handleSubmit = async () => {
    setNotificationData({ message: 'Espere un momento mientras se cargan los datos', severity: 'warning' });
    setOpenNotification(true);
    if(image instanceof Blob){
      const base = await imageToBase64(image);
      const response = await postPacientMeal(mealData.description, mealData.pica, mealData.wasSatisfied, base as string, ingredients, image.name);
      if (response.status === 200) {
        setNotificationData({ message: 'Comida registrada con éxito.', severity: 'success' });
        setOpenNotification(true);
      } else {
        setNotificationData({ message: 'Error al cargar la comida.', severity: 'error' });
        setOpenNotification(true);
      }
    }
    setMealData({
      description: '',
      mealImage: '',
      pica: false,
      wasSatisfied: false,
    });
    setIngredients([]);
    setIngredient({ name: '', quantity: '', type: '' });
    setImage(null);
  };

  const isFormValid = () => {
    return (
      mealData.description.trim() !== '' &&
      mealData.mealImage &&
      ingredients.length > 0 &&
      ingredients.every((ingredient) => ingredient.name.trim() !== '' && ingredient.quantity.trim() !== '')
    );
  };

  const renderThumbnail = () => {
    if (mealData.mealImage) {
      return <Image src={URL.createObjectURL(mealData.mealImage)} alt="Thumbnail" width={400}  height={400}/>;
    }
    return null;
  };
  
  

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
        Comidas
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" alignItems="center" gap={4} p={2} >
          <div className="flex flex-col flex-1">
            <div>
              <TextField
                id="outlined-basic"
                label="Describe tu comida"
                variant="outlined"
                name="description"
                value={mealData.description}
                onChange={handleInputChange}
                className="w-full"
                required
              />
              <FormGroup>
                <div className="flex">
                  <FormControlLabel
                    control={<Switch checked={mealData.pica} onChange={handleSwitchChange} name="pica" />}
                    label="Pica"
                    required
                  />
                  <FormControlLabel
                    control={<Switch checked={mealData.wasSatisfied} onChange={handleSwitchChange} name="wasSatisfied" />}
                    label="Satisfecho?"
                    required
                  />
                </div>
              </FormGroup>
              
              {renderThumbnail()}
              <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CameraAltIcon />}>
                Subir Foto
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </Button>
          
              
              
            </div>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                Ingredientes
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col">
                  <TextField
                    id="ingredient-name"
                    label="Nombre del ingrediente"
                    value={ingredient.name}
                    onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
                    required
                  />
                  <TextField
                    id="ingredient-quantity"
                    label="Cantidad"
                    value={ingredient.quantity}
                    onChange={(e) => setIngredient({ ...ingredient, quantity: e.target.value })}
                    required
                    type='number'
                  />
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Selecciona un tipo de ingrediente</InputLabel>
                  <Select
                    labelId="Tipo de ingrediente"
                    id="ingredient-type"
                    value={ingredient.type}
                    label="Tipo de ingrediente"
                    onChange={(e) => setIngredient({ ...ingredient, type: e.target.value as string})}
                    required
                  >
                    <MenuItem value={'vegetal'}>Vegetal</MenuItem>
                    <MenuItem value={'fruta'}>fruta</MenuItem>
                    <MenuItem value={'proteina'}>proteina</MenuItem>
                    <MenuItem value={'lacteo'}>lacteo</MenuItem>
                    <MenuItem value={'cereal'}>cereal</MenuItem>
                    <MenuItem value={'carbohidrato'}>carbohidrato</MenuItem>
                    <MenuItem value={'otro'}>otro</MenuItem>
                    
                </Select>
                </FormControl>
                  <Button onClick={handleAddIngredient} variant="contained" startIcon={<AddIcon />}>
                    Agregar Ingrediente
                  </Button>
                </div>
                <div>
                  {ingredients.length > 0 && <strong>Ingredientes:</strong>}
                  <ul>
                    {ingredients.map((ingredient, index) => (
                      <li key={index}>
                       {ingredient.type} - {ingredient.name} - {ingredient.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>

            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isFormValid()}>
              Registrar Comida
            </Button>
          </div>
        </Box>
      </AccordionDetails>
      <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        onClose={() => setOpenNotification(false)}
      >
        <Alert variant='filled' severity={notificationData.severity}>{notificationData.message}</Alert>
      </Snackbar>
    </Accordion>
  );
}
