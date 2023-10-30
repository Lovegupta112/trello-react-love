import {useState} from 'react';
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Box,Button,
TextField,Stack,Fab} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
const BoardDialogbox = ({createBoard}) => {

    const [name,setName]=useState('');
    const [open, setOpen] = useState(false);

    const handleClose=()=>{
        setOpen(false);
    }
    const handleCreate=()=>{
      if(name){
        createBoard(name);
      }
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

        <Fab
        color="primary"
        variant="extended"
        aria-label="create board"
        sx={{ position: "fixed", right: "20px", bottom: "20px" }}
        onClick={() => setOpen(true)}
      >
        {/* for showing create board button ------ */}
        <AddIcon sx={{ mr: 1 }} />
        Create Board
      </Fab>

    </Box>
  )
}

export default BoardDialogbox;