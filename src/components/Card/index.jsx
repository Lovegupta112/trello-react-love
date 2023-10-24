import React from 'react';
import {Stack, IconButton,Typography} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const index = ({cardInfo}) => {

    const {name,id} =cardInfo;
  return (
    <Stack direction='row' spacing={2} padding={2} borderRadius={1} boxShadow={2} sx={{border:'1px solid grey',justifyContent:'space-between'}}>
        <Typography>{name}</Typography>
        <IconButton aria-label='card-settings' ><EditOutlinedIcon /></IconButton>
    </Stack>
  )
}

export default index;