import React ,{useState} from 'react';
import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@mui/material';

const DeleteItem = ({open,setOpen,setIsClosed,itemName}) => {

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
    <DialogTitle>Archive {itemName}</DialogTitle>
    <DialogContent>
        <DialogContentText>
        Do you want to Archive this {itemName} ?
        </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleArchive}>Archive</Button>
    </DialogActions>
   </Dialog>
  )
}

export default DeleteItem;