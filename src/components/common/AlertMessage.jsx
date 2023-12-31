import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMessage({message,isCompleted,handleClose}) {

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
           <Snackbar open={isCompleted} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
