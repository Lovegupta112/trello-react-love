import React from 'react';
import {Paper,Stack,Button,Typography,TextField} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const index = ({list}) => {
  // console.log(list);
  return (
    <Paper elevation={3} sx={{minWidth:250,height:'fit-content',padding:'1rem 0.5rem'}} >
        <Stack direction='row' sx={{alignItems:'center',justifyContent:'space-between'}}>
        <Typography>{list.name}</Typography>
         <Button className='list-setting-btn' id={list.id}><MoreHorizIcon /></Button>
        </Stack>
        {/* <TextField  defaultValue={list.name}/> */}
    </Paper>
  )
}

export default index;