import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  
  const progressValue=Math.round(props.value);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
       <Box sx={{ minWidth: 35 , mr: 1 }}>
        <Typography variant="body2" color="text.secondary" >{progressValue}%</Typography>
      </Box>
      <Box sx={{ width: '100%'}}>
        <LinearProgress variant="determinate" {...props} className={progressValue==100?'progress':''} />
      </Box>
    </Box>
  );
}



export default function ProgressBar({progress}) {

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress}  />
    </Box>
  );
}