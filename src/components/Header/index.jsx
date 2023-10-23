import {useEffect,useState} from 'react';
import {AppBar, IconButton, Toolbar,Stack,Button,Typography} from '@mui/material'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import trello from '../../assets/images/trello-logo.svg';
import axios from 'axios';


// https://api.trello.com/1/members/me/?key={yourAPIKey}&token={yourAPIToken} 

const apiKey=import.meta.env.VITE_API_KEY;
const apiToken=import.meta.env.VITE_API_TOKEN;

const index = () => {

    const [username,setUsername]=useState('');

    useEffect(()=>{
      getUserInfo();
    },[]);

   async function getUserInfo(){
     try{
        const response=await axios.get(`https://api.trello.com/1/members/me/?key=${apiKey}&token=${apiToken}`);
        const data=response.data;
        setUsername(data.username);
     }
     catch(error){
         console.log('Error: ',error);
     }
   }


  return (
    <AppBar position='static' sx={{backgroundColor:'var(--midnight-blue)'}}>
        <Toolbar >
          <IconButton size='small' edge='start' color='inherit' aria-label='trello-logo' >
            <img src={trello} alt='trello-logo' color='white' sx={{width:'100%',height:'100%'}}/>
          </IconButton>
          <Typography sx={{marginInline:'0.5rem',fontWeight:'800',flexGrow:1,cursor:'pointer'}}variant='h6' component='div'>
             Trello
          </Typography>
          <Stack direction='row' >
             <IconButton size='large' edge='end' color='inherit' aria-label='account-logo'>
                <AccountCircleIcon />
             </IconButton >
             <Button color='inherit'>{username}</Button>
          </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default index;