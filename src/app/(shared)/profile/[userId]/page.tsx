'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from "@/components/Navbar";
import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Alert } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getIndications, getMe, getMeByToken } from "@/actions/getActions";
import { useEffect, useState } from "react";
import BasicModal from "@/components/BasicModal";
import QuestionsModal from "@/components/QuestionsModal";
import {UserInfoByAssitent } from '@/types';
import EChartsMultiLineChart from '@/components/AnthropometricsChart';
import { deleteIndications } from '@/actions/deleteActions';
import { deleteQuestions } from '@/actions/deleteActions';
import {getBotQuestions} from '@/actions/getActions';
interface Indications {
  indicationId: string;
  description: string;
}
interface questions {
  questionId: string;
  question: string;
  answer: string;
}

const ProfilePage = ({ params }: { params: { userId: string } }) => {
  const [indications, setIndications] = useState<Indications[]>([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationData, setNotificationData] = useState<{ message: string; severity: "error" | "success" | "warning" }>({ message: '', severity: 'success' });
  const [currentUserInfo, setCurrentUserInfo] = useState<UserInfoByAssitent>({} as UserInfoByAssitent);
  const[questions, setQuestions] = useState<questions[]>([]);
  useEffect(() => {
    fetchIndications();
    fetchUser();
    fetchQuestions();
  }, []);
  const handleSnackbarClose = () => setOpenNotification(false);

  const fetchQuestions = async () => {
    const response = await getBotQuestions();
    if (response.status === 200) {
      setQuestions(response.data);
      
    } else {
      setOpenNotification(true);
      setNotificationData({ message: response.message, severity: 'error' });
    }
  }

  const fetchIndications = async () => {
    try {
      const response = await getIndications();
      if (response.status === 200) {
        setIndications(response.data || []);
      } else {
        console.error('Error fetching indications:', response.message);
      }
    } catch (error) {
      console.error('Error fetching indications:', error);
    }
  }
  const fetchUser = async () => {
    const response =  await getMeByToken();
    if(response.data.userId !== params.userId){
      setOpenNotification(true);
      setNotificationData({ message: 'No tienes permisos para ver este perfil, se enviara un reporte por actividad sospechosa', severity: 'error' });
     
    }
    if (response.status === 200) {
      setCurrentUserInfo(response.data);
     

    } else {
      setOpenNotification(true);
      setNotificationData({ message: response.message, severity: 'error' });
    }
  }
  const handleDelete = async (indicationId: string) => {
    const response = await deleteIndications(indicationId);
    if (response.status === 200) {
      await fetchIndications();
      setOpenNotification(true);
      setNotificationData({ message: 'Indicación eliminada correctamente', severity: 'success' });

    } else {
      setOpenNotification(true);
      setNotificationData({ message: response.message, severity: 'error' });
      console.error(response.message);
    }
  }

  const handleQuestionDelete = async (questionId: string) => {
    const response = await deleteQuestions(questionId);
    if (response.status === 200) {
      await fetchQuestions();
      setOpenNotification(true);
      setNotificationData({ message: 'Pregunta eliminada correctamente', severity: 'success' });

    } else {
      setOpenNotification(true);
      setNotificationData({ message: response.message, severity: 'error' });
      console.error(response.message);
    }
  }


  const handleModalSubmit = async () => {
    // Aquí puedes poner cualquier lógica que necesites para el manejo de envío del formulario en el modal

    // Después de que se haya enviado exitosamente el formulario, vuelva a cargar las indicaciones
    await fetchIndications();
    await fetchQuestions();
  };

  return (
    <div>
      {
        currentUserInfo.role === 'specialist' &&
        <>
        <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          Mis Indicaciones
        </AccordionSummary>
        <AccordionDetails sx={{ maxHeight: '300px', overflowY: 'auto' }}>
          <TableContainer component={Paper} style={{ maxWidth: '520px' }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="right">Descripcion</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                {indications.map((indication) => (
                  <TableRow key={indication.indicationId}>
                    <TableCell align="left" style={{ maxWidth: '100px' }}>{indication.indicationId}</TableCell>
                    <TableCell align="right" style={{ maxWidth: '100px', wordBreak: 'break-all'  }}>{indication.description}</TableCell>
                    <TableCell align="right">
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="flex items-center" onClick={() => handleDelete(indication.indicationId)}>
                    <DeleteIcon />
                  </button>
                </div>
              </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
            <BasicModal onSubmit={handleModalSubmit} userId={params.userId} />
      </Accordion>

      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon  />} aria-controls="panel1-content" id="panel1-header">
          Mis Preguntas Frecuentes
        </AccordionSummary>
        <AccordionDetails sx={{ maxHeight: '300px', overflowY: 'auto' }}>
          <TableContainer component={Paper} style={{ maxWidth: '520px' }}>
            <Table aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="right">Pregunta</TableCell>
                  <TableCell align="right">Respuesta</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.questionId}>
                    <TableCell align="left" style={{ maxWidth: '100px' }}>{question.questionId}</TableCell>
                    <TableCell align="right" style={{ maxWidth: '100px' }}>{question.question}</TableCell>
                    <TableCell align="right" style={{ maxWidth: '100px' }}>{question.answer}</TableCell>
                    <TableCell align="right">
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="flex items-center" onClick={() => handleQuestionDelete(question.questionId)}>
                          <DeleteIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
            <QuestionsModal onSubmit={handleModalSubmit}  />
      </Accordion>
        <div className='mb-16'>
           <h2 className="font-bold text-primary-default mt-8 mb-4 text-center">Información Personal</h2>
            <div className="bg-white shadow-base rounded-3xl p-8 flex flex-col gap-y-4">
                <div>
                    <span className="block text-xs text-gray-400">Cédula</span>
                    <span>{currentUserInfo.userId}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Nombre</span>
                    <span>{currentUserInfo.name}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Especialidad</span>
                    <span>{currentUserInfo.specialty}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Correo Electrónico</span>
                    <span>{currentUserInfo.email}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Dirección</span>
                    <span>{currentUserInfo.address}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Teléfono</span>
                    <span>{currentUserInfo.phone}</span>
                </div>
                {currentUserInfo.programs ? (
                    <div>
                        <span className="block text-xs text-gray-400 mb-2">Programas</span>
                        <div className="flex flex-wrap gap-2">
                            {currentUserInfo.programs.map((program) => (
                                <div
                                    key={program.programId}
                                    className="rounded-full bg-secondary-default p-1 px-2 w-fit text-sm"
                                >
                                    {program.programName}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <span className="block text-xs text-gray-400">Programa</span>
                            <span>{currentUserInfo.program}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-400">
                                Descripción del Programa
                            </span>
                            <span>{currentUserInfo.description}</span>
                        </div>
                    </>
                )}
            </div>
            </div>
        
        
      </>
      }

      {
        currentUserInfo.role === 'pacient' && 
        <>
           <h2 className="font-bold text-primary-default mt-8 mb-4 text-center">Información Personal</h2>
            <div className="bg-white shadow-base rounded-3xl p-8 flex flex-col gap-y-4">
                <div>
                    <span className="block text-xs text-gray-400">Cédula</span>
                    <span>{currentUserInfo.userId}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Nombre</span>
                    <span>{currentUserInfo.name}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Correo Electrónico</span>
                    <span>{currentUserInfo.email}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Dirección</span>
                    <span>{currentUserInfo.address}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-400">Teléfono</span>
                    <span>{currentUserInfo.phone}</span>
                </div>
                {currentUserInfo.programs ? (
                    <div>
                        <span className="block text-xs text-gray-400 mb-2">Programas</span>
                        <div className="flex flex-wrap gap-2">
                            {currentUserInfo.programs.map((program) => (
                                <div
                                    key={program.programId}
                                    className="rounded-full bg-secondary-default p-1 px-2 w-fit text-sm"
                                >
                                    {program.programName}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <span className="block text-xs text-gray-400">Programa</span>
                            <span>{currentUserInfo.program}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-400">
                                Descripción del Programa
                            </span>
                            <span>{currentUserInfo.description}</span>
                        </div>
                    </>
                )}
            </div>

            <EChartsMultiLineChart params={{pacientId: currentUserInfo.userId}}/>

        </>
      }
      <Navbar />
      <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert variant="filled" onClose={handleSnackbarClose} severity={notificationData.severity} sx={{ width: '100%' }}>
          {notificationData.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProfilePage;
