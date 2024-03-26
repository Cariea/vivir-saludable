import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SelectChangeEvent } from '@mui/material/Select';
import { postActivitie } from "@/actions/postActions";
// Define las opciones de los campos
const fieldOptions = [
    { label: "Tiempo en minutos", value: "time", min: 0, max: 300 },
    { label: "Distancia en metros", value: "distance", min: 0, max: 5000 },
    { label: "Peso en kg", value: "weight", min: 0, max: 100 },
    { label: "Numero de Repeticiones", value: "repetitions", min: 0, max: 10000 },
];


// Definir el tipo de formData con una firma de índice
interface FormData {
    [key: string]: string | number;
}

export const Activities = () => {
    // Estados para los campos de actividad física
    const [fieldsToShow, setFieldsToShow] = useState<string[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        time: 0,
        distance: 0,
        weight: 0,
        repetitions: 0,
        description: ''
    });

    // Manejador de evento para seleccionar los campos a mostrar
    const handleFieldSelectChange = (event: SelectChangeEvent<string[]>) => {
        setFieldsToShow(event.target.value as string[]);
    };

    // Manejador de evento para cambiar los valores de los campos
    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string, min: number, max: number) => {
        let value: string | number = event.target.value;
        if (event.target.type === 'number') {
            const numValue = parseFloat(event.target.value);
            value = isNaN(numValue) ? '' : Math.min(Math.max(numValue, min), max);
        }
        setFormData({ ...formData, [fieldName]: value });
    };

    // Manejador de evento para enviar los datos de la actividad física
    const handleSubmit = async () => {
        // Validar si los campos mostrados están llenos
        const requiredFieldsFilled = formData.name !== '' && formData.description !== '';
        const fieldsAreFilled = fieldsToShow.every(field => formData[field] !== '' && formData[field] !== 0);
        
        if (fieldsAreFilled && requiredFieldsFilled) {
            // Lógica para enviar los datos al servidor
            console.log("Datos de la actividad física:", formData);
            const response = await postActivitie(formData.name as string, formData.description as string, formData.time as number, formData.distance as number, formData.weight as number, formData.repetitions as number);
            if (response.status === 200) {
                alert("Actividad física registrada con éxito.");
                setFormData({
                    name: '',
                    time: 0,
                    distance: 0,
                    weight: 0,
                    repetitions: 0,
                    description: ''
                });
            } else {
                alert("Error al registrar la actividad física.");
            }
        } else {
            alert("Por favor, llene todos los campos mostrados.");
        }
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                Registrar Actividad Física
            </AccordionSummary>
            <AccordionDetails>
                <div style={{ width: '100%' }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="field-selector-label">Campos a Mostrar</InputLabel>
                        <Select
                            labelId="field-selector-label"
                            id="field-selector"
                            multiple
                            value={fieldsToShow}
                            onChange={handleFieldSelectChange}
                            renderValue={(selected) => (selected as string[]).join(", ")}
                        >
                            {fieldOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        fullWidth
                        margin="normal"
                        type="text"
                    />
                    {fieldOptions.map((option) => (
                        fieldsToShow.includes(option.value) && (
                            <TextField
                                key={option.value}
                                label={option.label}
                                variant="outlined"
                                value={formData[option.value]}
                                onChange={(e) => handleFieldChange(e, option.value, option.min, option.max)}
                                fullWidth
                                margin="normal"
                                type="number"
                                inputProps={{ min: option.min, max: option.max }}
                            />
                        )
                    ))}
               
                    
               
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        />
                        
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            fullWidth
                        >
                            Registrar Actividad
                        </Button>
                    </div>
                </AccordionDetails>
            </Accordion>
        );
    };
    
    export default Activities;
    