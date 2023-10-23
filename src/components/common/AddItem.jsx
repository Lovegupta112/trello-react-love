import React , {useState} from 'react';
import {Box,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions, TextField,Button} from '@mui/material';

const AddItem = ({open,setOpen,setListName}) => {

    const [name,setName]=useState('');

    function handleClose(){
     setOpen(false);
    }

    function handleCreate(){
        setListName(name);
        setOpen(false);
        setName('');
    }

  return (
    <Box>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent sx={{margin:'0.3rem'}}>
                <DialogContentText sx={{margin:'0.3rem'}}>List Title</DialogContentText>
                <TextField label='Enter List Title' autoFocus value={name} margin='dense'  onChange={(e)=>setName(e.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreate} variant='contained'>Add List</Button>
                <Button onClick={handleClose}>X</Button>
            </DialogActions>
        </Dialog>
    </Box>
  )
}

export default AddItem;