import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { postIndications } from '@/actions/postActions';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { set } from 'react-hook-form';

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
  userId: string;
  onSubmit: () => Promise<void>; // Acepta onSubmit como una prop
}

const IndicationsModal: React.FC<BasicModalProps> = ({ userId, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationData, setNotificationData] = useState<{ message: string; severity: "error" | "success" | "warning" }>({ message: '', severity: 'success' });

  const handleOpen = () => setOpen(true);
  const handleClose = async () => {
    const response = await postIndications(inputValue, userId);
    if (response.status === 200) {
      setOpen(false);
      onSubmit(); // Llamar a onSubmit cuando se cierre el modal
      setInputValue('');
    } else {
      setOpenNotification(true);
      setNotificationData({ message: response.message, severity: 'error' });
      console.error(response.message);
    }
  };

  const handleSnackbarClose = () => setOpenNotification(false);

  return (
    <div>
      <Button onClick={handleOpen}>Agregar Indicacion</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ingrese su indicacion
          </Typography>
          <TextField
            id="input"
            label="Input"
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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

export default IndicationsModal;
