import React ,{useState} from 'react';
import {Box,Button, Accordion,AccordionDetails,AccordionSummary,Typography,TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from "@mui/icons-material/Add";


const AddList = ({setListName}) => {

    const [expanded,setExpanded]=useState(false);
    const [name,setName]=useState('');

   const handleChange=(panel)=>(event,isExpanded)=>{
    setExpanded(isExpanded ? panel : false);
    }


    function handleClose(){
        // setOpen(false);
        setExpanded(false);
       }
   
       function handleCreate(){
           setListName(name);
        console.log(name);
        if(name){
            setExpanded(false);
            setName('');
        }
       }

  return (
    <Box>
        <Accordion expanded={expanded==='panel1'} onChange={handleChange('panel1')} >
           <AccordionSummary  aria-controls="panel1a-content"
          id="panel1a-header" >
            {/* <Typography>hello</Typography> */}
            <Button direction='row' startIcon={<AddIcon />} sx={{minWidth:200,height:'fit-content'}} >{expanded ? 'Enter List Name':'Add Another List'}</Button>
      
          </AccordionSummary>
          <AccordionDetails>
          <TextField autoFocus value={name} margin='dense'  onChange={(e)=>setName(e.target.value)}/>
          <Box  padding={2} >
          <Button onClick={handleCreate} variant='contained'>Add List</Button>
          <Button onClick={handleClose}>X</Button>
          </Box>
          </AccordionDetails>
        </Accordion>
        
    </Box>
  )
}

export default AddList