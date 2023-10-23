import {useState} from 'react';
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Box,Button,
TextField} from '@mui/material';

const BoardDialogbox = ({open,setOpen,setBoardName}) => {

    const [name,setName]=useState('');

    const handleClose=()=>{
        setOpen(false);
    }
    const handleCreate=()=>{
        setBoardName(name);
        setOpen(false);
        setName('');
    }
  return (
    <Box className='board-dialog'>
        <Dialog open={open} onClose={handleClose} fullWidth  sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "80%",
          maxWidth: "400px",   
        },
      },
    }}>
            <DialogTitle>New Board</DialogTitle>
            <DialogContent sx={{margin:'0.3rem'}}>
            <TextField label='Board Name' variant='standard' margin="dense" autoFocus value={name} onChange={(e)=>setName(e.target.value)}fullWidth />
            </DialogContent>
            <DialogActions>
             <Button onClick={handleClose}>Cancel</Button>
             <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    </Box>
  )
}

export default BoardDialogbox;