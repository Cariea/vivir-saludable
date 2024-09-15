import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { postBotQuestion } from '@/actions/postActions';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  onSubmit: () => Promise<void>; // Acepta onSubmit como una prop
}
interface Question{
  question:string;
  answer:string;
}

const QuestionsModal: React.FC<BasicModalProps> = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState<Question>({question:'',answer:''});
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationData, setNotificationData] = useState<{ message: string; severity: "error" | "success" | "warning" }>({ message: '', severity: 'success' });

  const handleOpen = () => setOpen(true);
  const handleClose = async () => {
    if(question.question === '' || question.answer === ''){
      setOpenNotification(true);
      setNotificationData({ message: 'Por favor llene todos los campos', severity: 'error' });
      return;
    }
    const response = await postBotQuestion(question.question, question.answer);
    console.log(`Se hizo el post y devolvio ${response.status}`)
    if (response.status === 200) {
      setOpen(false);
      onSubmit(); 
      setQuestion({question:'',answer:''});
    } else {
      setOpenNotification(true);
      setNotificationData({ message: 'Ocurrio un error al guardar la pregunta', severity: 'error' });
    }
  };

  const handleSnackbarClose = () => setOpenNotification(false);

  return (
    <div>
      <Button onClick={handleOpen}>Agregar Pregunta</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ingrese su pregunta frecuente con su respuesta
          </Typography>
          <TextField
            id="inputp"
            label="pregunta"
            variant="outlined"
            fullWidth
            value={question.question}
            onChange={(e) => setQuestion({...question,question:e.target.value})}
          />
          <TextField
            id="inputr"
            label="respuesta"
            variant="outlined"
            fullWidth
            value={question.answer}
            onChange={(e) => setQuestion({...question,answer:e.target.value})}  
          />
          <Button variant="contained" onClick={handleClose}>
            Submit
          </Button>
          <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert variant="filled" onClose={handleSnackbarClose} severity={notificationData.severity} sx={{ width: '100%' }}>
              {notificationData.message}
            </Alert>
          </Snackbar>
        </Box>
      </Modal>
    </div>
  );
}

export default QuestionsModal;
