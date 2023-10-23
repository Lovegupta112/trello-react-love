import { Snackbar ,Button ,Alert} from "@mui/material";
import {useState,forwardRef} from 'react';
import AddIcon from "@mui/icons-material/Add";

const SnackBarAlertButton=({btnMessage,message,msgBgColor,btnBgColor})=>{

const [open,setOpen]=useState(false);

const SnackBarAlert=forwardRef(function SnackBarAlert(props,ref){
  return <Alert elevation={6} ref={ref} {...props} variant="filled"/>
})

console.log(message,msgBgColor);
function handleClose(event,reason){
  if(reason==='clickaway'){
     return ;
  }
  setOpen(false);
}
    return (
        <>
        <Button onClick={()=>setOpen(true)} variant='contained' sx={{color:'white',backgroundColor:`${btnBgColor}`}}   startIcon={ <AddIcon />}>{btnMessage}</Button>
        
         <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical:'top',horizontal:'right'}}>
            <SnackBarAlert onClose={handleClose} severity={msgBgColor}>
            {message}
            </SnackBarAlert>
         </Snackbar>
        </>
    )
};


SnackBarAlertButton.defaultProps={
  message:'Created SuccessFully !',
  msgBgColor:'success'
}
export default SnackBarAlertButton;