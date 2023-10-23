import React ,{useState} from 'react';
import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@mui/material';

const DeleteList = ({open,setOpen,setIsClosed}) => {

// const [open,setOpen]=useState(false);

    function handleClose(){
      setOpen(false);
    }
    function handleArchive(){
        setIsClosed(true);
        setOpen(false);
    }
  return (
   <Dialog open={open} onClose={handleClose} aria-label="delete-dialog-title">
    <DialogTitle>Archive List</DialogTitle>
    <DialogContent>
        <DialogContentText>
        Do you want to Archive this List ?
        </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleArchive}>Archive</Button>
    </DialogActions>
   </Dialog>
  )
}

export default DeleteList;