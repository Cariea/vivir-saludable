'use client'
import { Stack,Box,ButtonGroup,Button, Typography  } from '@mui/material';
import { getSession } from '@/actions/authActions';
import { useEffect, useState } from 'react';
import { consent } from '@/actions/putActions';
import { useRouter } from "next/navigation";

export default function ConsentPage() {
const [session,setSession]=useState<{id:string,name:string,role:string}>()

const router = useRouter()
const get = async () =>{
  const data = await getSession();
  setSession(data)
}

const accept = async()=>{
  const data = await consent()
  console.log(data)
  switch (session?.role) {
    case "specialist":
        router.push("/pacients");
    case "pacient":
        router.push("/specialists");
    default:
        router.push("/users");
}
}

const reject = async()=>{
  router.push('/login')
  console.log('rechazado')
}
  useEffect(()=>{
    get()
  }
  ,[])

 
    return (
        <Box sx={{display:'flex',justifyContent:'center'}}>
          <Stack direction='column'>
            <Box sx={{padding:'2rem'}}>
              <Typography variant='h5' sx={{textAlign:'center',padding:'2rem'}}>
              Consentimiento para el Manejo de Datos Personales y de Salud
              </Typography>

             
                  
                  
                  <Typography>Yo, {session && session.name}, titular de la cédula de identidad No. {session && session.id}, en mi calidad de usuario de la aplicación móvil `Vivir Saludable`, en adelante la Aplicación, en el marco del programa multidisciplinario de apoyo al paciente en el proceso de pérdida de peso denominado `Vivir Saludable`, otorgo mi consentimiento expreso para el manejo de mis datos personales y de salud de acuerdo con los términos y condiciones que a continuación se detallan:</Typography>
                    <br />
                  <Typography>Autorización de Datos Personales:</Typography>
                    <Typography>
                      <br />
                      a. Autorizo el tratamiento de mis datos personales, incluyendo pero no limitándose a mi nombre, dirección, número de teléfono, dirección de correo electrónico y cualquier otra información personal proporcionada por mí durante el registro en la Aplicación.
                      <br />
                      b. Entiendo que mis datos personales serán utilizados únicamente para los fines del programa `Vivir Saludable`, incluyendo la gestión de mi perfil de usuario, el seguimiento de mi progreso en el programa y la comunicación con el equipo multidisciplinario de apoyo.
                      <br />
                      c. Acepto que mis datos personales puedan ser compartidos con los profesionales de la salud y otros colaboradores del programa `Vivir Saludable` únicamente con el propósito de brindarme el mejor servicio posible.
                    </Typography>

                  <br />
                  <Typography>Autorización de Datos de Salud:</Typography>
                  
                  <Typography>
                    <br />
                    a. Autorizo el tratamiento de mis datos de salud, incluyendo pero no limitándose a información sobre mi historial médico, resultados de análisis clínicos, medidas antropométricas, hábitos alimenticios y cualquier otra información relacionada con mi salud que yo proporcione voluntariamente a través de la Aplicación.
                    <br />
                    b. Reconozco que la recopilación y el análisis de mis datos de salud son necesarios para el adecuado funcionamiento del programa `Vivir Saludable`, y para proporcionarme un seguimiento personalizado y efectivo durante mi proceso de pérdida de peso.
                    <br />
                    c. Comprendo que mis datos de salud serán tratados de manera confidencial y solo serán accesibles para el equipo de profesionales de la salud involucrados en el programa `Vivir Saludable`, quienes están sujetos a estrictas normas de confidencialidad.
                  </Typography>

                  <br />
                  <Typography>
                    Derechos del Titular de los Datos:
                  </Typography>
                  <Typography>
                    <br />
                    a. Reconozco que tengo derecho a acceder, rectificar, cancelar y oponerme al tratamiento de mis datos personales y de salud, conforme a lo establecido en la legislación vigente sobre protección de datos personales.
                    <br />
                    b. Entiendo que puedo ejercer mis derechos en cualquier momento enviando una solicitud por escrito al responsable del tratamiento de datos, identificado en los términos y condiciones de la Aplicación.
                    <br />
                  </Typography>
                  <br />
                  Acepto que he leído y comprendido los términos y condiciones del presente consentimiento, y otorgo mi consentimiento libre, expreso e informado para el manejo de mis datos personales y de salud de acuerdo con lo establecido en este documento.
                  <br />
                  Al hacer clic en el botón `Aceptar`, confirmo mi aceptación de los términos y condiciones establecidos en este consentimiento para el manejo de datos personales y de salud en la Aplicación `Vivir Saludable`.
                  <br />
                  {session && session.name}
                  Titular de la cédula de identidad No. {session && session.id}
                  <br />
                  Fecha: {new Date().toLocaleDateString()}
            </Box>
            <Box sx={{display:'flex',justifyContent:'center'}}>
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button onClick={()=> accept()} color='success'>Aceptar</Button>
                <Button onClick={()=> reject()}  color='error'>Rechazar</Button>
              </ButtonGroup>
            </Box>
          </Stack>
        </Box>
    );
}