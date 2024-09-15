import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';


interface AlertDialogProps {
    text: string;
    title: string;
    open: boolean;
    color: any;
    action: any;
    setOpen: (value: boolean) => void;
}

export default function AlertDialog({
    text,
    title,
    color,
    action,
    open,
    setOpen
}: AlertDialogProps) {

  const handleClose = () => {
    setOpen(false);
  };

  const handleDesenlazar =() => {
    action();
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: "100%", padding: "1rem" }}>
            <Stack spacing={1} width="100%">
                <Button fullWidth color={color} onClick={handleClose}>Cancelar</Button>
                <Button fullWidth variant="contained" color={color} onClick={handleDesenlazar} autoFocus>
                    Desenlazar
                </Button>
            </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}