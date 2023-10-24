import {useState,useEffect} from 'react';
import axios from 'axios';
import {Paper,Stack,Button,Typography,TextField} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddItem from '../common/AddItem';
import Card from '../Card';



const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

//  get all Cards -------
async function getAllCards(listId,setCards){
  try{
     const response=await axios.get(`https://api.trello.com/1/lists/${listId}/cards/?key=${apiKey}&token=${apiToken}`);
     console.log(response.data);
     setCards(response.data);
   
  }
  catch(error){
    console.log('Error: ',error);
  }
}

const index = ({list}) => {

   const [cards,setCards]=useState([]);
   const [cardTitle,setCardTitle]=useState('');

  useEffect(()=>{
    getAllCards(list.id,setCards);
  },[]);
  
  return (
    <Stack sx={{minWidth:270,height:'fit-content',maxHeight:'70vh',padding:'1rem 0.5rem',backgroundColor:'white'}} className='list'>
    <Stack elevation={3}  spacing={2} sx={{overflowY:'scroll'}}>
        <Stack direction='row' sx={{alignItems:'center',justifyContent:'space-between'}}>
        <Typography>{list.name}</Typography>
         <Button className='list-setting-btn' id={list.id}><MoreHorizIcon /></Button>
        </Stack>
         
         {/* cards list --------------- */}
          <Stack sx={{maxHeight:'50vh',overflowY:'auto'}} spacing={2} className='cards-container'>
           {cards.map((card)=>(
            <Card key={card.id} cardInfo={card}/>
           ))}
          </Stack>
          <AddItem setItemTitle={setCardTitle} itemName='a Card' btnText='Add Card'/>

    </Stack>
    </Stack>
  )
}

export default index;