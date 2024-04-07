'use client';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Snackbar, Typography } from "@mui/material"
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface QuestionsViewProps {
  questions: {question:string, answer:string, questionId:number, specialistId:string}[]
}

export const QuestionsView = (questions: QuestionsViewProps) => {
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationData, setNotificationData] = useState<{ message: string; severity: "error" | "success" | "warning" }>({ message: '', severity: 'success' });
  const handleQuestions = (e: React.MouseEvent<HTMLDivElement>, key:number) => {
    questions.questions.map((question) => {
      if (question.questionId === key) {
        setNotificationData({ message: question.answer, severity: 'success' });
   
          setOpenNotification(true);
        
      }
    })
  }
  const handleSnackbarClose = () => setOpenNotification(false);
    return (      
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap',width:'100%'}}>
        <Accordion sx={{width:'100%'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
        Preguntas Frecuentes
      </AccordionSummary>
          <AccordionDetails>
            {questions.questions.map((question,index) => {
              return (
                <div key={question.questionId} onClick={(e) => handleQuestions(e,question.questionId)} >
                  <Typography  variant="h6">{question.question}?</Typography>
                </div>
              )
            })}
          </AccordionDetails>
      </Accordion>
      <Snackbar open={openNotification} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert variant="filled" onClose={handleSnackbarClose} severity={notificationData.severity} sx={{ width: '100%' }}>
          {notificationData.message}
        </Alert>
      </Snackbar>
      </Box>
    )
}