import { useState } from "react"
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Snackbar, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {postAntrhropometricData} from '@/actions/postActions';
export interface Anthropometric {
  armCircunference: number;
  legCircunference: number;
  waist: number;
  hip: number;
  weight: number;
  size: number;
  musculoskeletalMass: number;
  bodyFatMass: number;
  bodyMassIndex: number;
  bodyFatPercentage: number;
  waistHipRatio: number;
  visceralFatLevel: number;
}

export const AntropometricsComponent = ({params}: {params:{pacientId:string}}) => {
  const [anthropometrics, setAnthropometrics] = useState<Anthropometric>({} as Anthropometric);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationData, setNotificationData] = useState<{ message: string; severity: "error" | "success" | "warning" }>({ message: '', severity: 'success' });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const value = e.target.value;
    if(isNaN(Number(value))){
      return;
    }
    
    setAnthropometrics({...anthropometrics, [field]: Number(value)});
    console.log(anthropometrics)
  }
  

  const handleSubmit = async() => {
    const allFields: Record<keyof Anthropometric, string> = {
      armCircunference: '',
      legCircunference: '',
      waist: '',
      hip: '',
      weight: '',
      size: '',
      musculoskeletalMass: '',
      bodyFatMass: '',
      bodyMassIndex: '',
      bodyFatPercentage: '',
      waistHipRatio: '',
      visceralFatLevel: ''
    };
    const errors: string[] = [];


   Object.keys(allFields).forEach(key => {
      const anthropometricValue = anthropometrics[key as keyof Anthropometric];
      if(anthropometricValue === undefined || anthropometricValue === null || anthropometricValue === 0){
        errors.push(key);
      }
    });
    if (errors.length === 0) {
      console.log(anthropometrics)
      const response = await postAntrhropometricData(params.pacientId, anthropometrics);
      if (response.status === 200) {
        setNotificationData({ message: 'Datos enviados correctamente', severity: 'success' });
        setOpenNotification(true);
      }else{
        console.log(response)
        setNotificationData({ message: 'Error al enviar los datos', severity: 'error' });
        setOpenNotification(true);
      }
    } else {
      setNotificationData({ message: `Los campos ${errors.join(', ')} son requeridos.`, severity: 'error' });
      setOpenNotification(true);
    }


}


  return(
    <> 
      <Snackbar open={openNotification} autoHideDuration={6000} onClose={() => setOpenNotification(false)}>
        <Alert variant="filled" onClose={() => setOpenNotification(false)} severity={notificationData.severity} sx={{ width: '100%' }}>
            {notificationData.message}
        </Alert>
      </Snackbar>
      <Box sx={{ width:'100%',display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'1rem'}}>
        <Typography sx={{marginBottom:'1rem'}} variant="h6">Registrar Antropometricos</Typography>
        <Accordion sx={{width:'100%'}} >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Fecha de hoy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Circunferencia del brazo</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'armCircunference',
                  min: 0,
                }}
                value={anthropometrics.armCircunference || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'armCircunference')}
              />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Circunferencia de pierna</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'legCircunference',
                  min: 0,
                }}
                value={anthropometrics.legCircunference || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'legCircunference')}
              />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Circunferencia de cintura</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'waist',
                  min: 0,
                }}
                value={anthropometrics.waist || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'waist')}
              />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Circunferencia de cadera</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'hip',
                  min: 0,
                }}
                value={anthropometrics.hip || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'hip')}
              />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Peso</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                  min: 0,
                }}
                value={anthropometrics.weight || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'weight')}
              />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Talla</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'size',
                  min: 0,
                }}
                value={anthropometrics.size || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'size')}
              />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Masa muscular</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'musculoskeletalMass',
                  min: 0,
                }}
                value={anthropometrics.musculoskeletalMass || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'musculoskeletalMass')}
              />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Masa grasa</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'bodyFatMass',
                  min: 0,
                }}
                value={anthropometrics.bodyFatMass || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'bodyFatMass')}
              />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Indice de masa corporal</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">kg/m²</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'bodyMassIndex',
                  min: 0,
                }}
                value={anthropometrics.bodyMassIndex || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'bodyMassIndex')}
              />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Porcentaje de grasa</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'bodyFatPercentage',
                  min: 0,
                }}
                value={anthropometrics.bodyFatPercentage || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'bodyFatPercentage')}
              />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Relación cintura-cadera</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end"></InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'waistHipRatio',
                  min: 0,
                }}
                value={anthropometrics.waistHipRatio || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'waistHipRatio')}
              />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <FormHelperText sx={{marginLeft:0}} id="outlined-weight-helper-text">Nivel de grasa visceral</FormHelperText>
              <OutlinedInput
                sx={{width: '100%', justifyContent: 'center'}}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end"></InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'visceralFatLevel',
                  min: 0,
                }}
                value={anthropometrics.visceralFatLevel || ''}
                type="number"
                onChange={(e) => handleInputChange(e, 'visceralFatLevel')}
              />
            </FormControl>
            <button onClick={handleSubmit}>Enviar</button>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  )
}
