import React from 'react';
import {Box, Typography} from '@mui/material';

const ErrorHandlingUi = () => {
  return (
    <Box className='error-handling' sx={{padding:'20vh 0',fontSize:'rem',textAlign:'center',color:'crimson',width:'fit-content',margin:'0 auto'}}>
         <Typography variant='h5'>
          "Apologies, there seems to be an issue retrieving the  data.
          <br /> Please try again later."
        </Typography>
    </Box>
  )
}

export default ErrorHandlingUi;