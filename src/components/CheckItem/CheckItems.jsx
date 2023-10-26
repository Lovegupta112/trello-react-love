import React ,{useState,useEffect} from 'react';
import axios from "axios";
// import {Stack} from '@mui/material';
import AddItem from "../common/AddItem";
import DeleteItem from '../common/DeleteItem';
import CheckItem from './CheckItem';
import ProgressBar from '../common/ProgressBar';
import {Stack} from '@mui/material';




const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

// for getting all checkItems------
async function getAllCheckItems(checkListId,setCheckItems,setProgress,setIsChanged){
  try{
   const response=await axios.get(`https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${apiToken}`);
    setCheckItems(response.data);
    if(response.data.length>0){
      updateProgress(response.data,setProgress,setIsChanged);
    }
  }
  catch(error){
  console.log('Error: ',error);
  }
  }


// for creating checkItem ------------
async function createCheckItem(checkListId,checkItemTitle,setCheckItemTitle,checkItems,setCheckItems,setIsChanged){
  try{
   const response= await axios.post(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemTitle}&key=${apiKey}&token=${apiToken}`)
   setCheckItems([...checkItems,response.data]);
   setCheckItemTitle('');
   setIsChanged(true);
  }
  catch(error){
    console.log('Error: ',error);
  }
}

// for deleting checkItem ------------
async function deleteCheckItem(checkListId,checkItemId,setCheckItemId,checkItems,setCheckItems,setIsDeleted,setIsChanged){
  try{
   const response= await axios.delete(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${apiKey}&token=${apiToken}`);
   setCheckItems(checkItems.filter(checkItem=>checkItem.id!==checkItemId));
   setCheckItemId('');
   setIsDeleted(false);
   setIsChanged(true);
  }
  catch(error){
    console.log('Error: ',error);
  }
}


 // for updating progressbar ---------------

 function updateProgress(data,setProgress,setIsChanged){
  // console.log({isChanged});
  const totalComplete=data.reduce((totalComplete,currentOBj)=>{
    if(currentOBj.state==="complete"){
      ++totalComplete;
    }
    return totalComplete;
},0)
// console.log({totalComplete});
// console.log({dataLength:data.length})
if(data.length===0){
  setProgress(0);
}else{
  const progress=Math.floor((totalComplete*100)/data.length);
  setProgress(progress);
}

setIsChanged(false);
 }



const index = ({checkListId}) => {

  const [checkItems,setCheckItems]=useState([]);
  const [checkItemTitle,setCheckItemTitle]=useState('');
  const [openCheckItemDialog,setOpenCheckItemDialog]=useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
 const [checkItemId,setCheckItemId]=useState('');
 const [progress,setProgress]=useState(0);
 const [isChanged,setIsChanged]=useState(false);

 

  useEffect(()=>{
    getAllCheckItems(checkListId,setCheckItems,setProgress,setIsChanged);
 },[]);


 if(checkItemTitle){
  createCheckItem(checkListId,checkItemTitle,setCheckItemTitle,checkItems,setCheckItems,setIsChanged);
}

if(isDeleted && checkItemId){
  deleteCheckItem(checkListId,checkItemId,setCheckItemId,checkItems,setCheckItems,setIsDeleted,setIsChanged);
}

if(isChanged){
  updateProgress(checkItems,setProgress,setIsChanged);
}
 



function handleClick(e){

  // for deleting checkitem on checklist ---------
  if(e.target.closest('.delete-checkItem-btn')){
    const id=e.target.closest('.checkItem')?.dataset.checkitem;
   setOpenCheckItemDialog(true);
   setCheckItemId(id);
  }
}



  return (
   <>
    <ProgressBar progress={progress}/>

    <Stack className="checklist-checkitems" sx={{width:'100%', justifyContent: "space-between",maxHeight:'20vh',overflowX:'auto'}}   onClick={(e)=>handleClick(e)}>
    {checkItems.map((checkitem)=>{
      return <CheckItem info={checkitem}  key={checkitem.id} setCheckItems={setCheckItems} setIsChanged={setIsChanged} />
    
})}
  </Stack>    

     {/* checkItem creation box-------- */}
     <Stack className="addCheckItem-button">
         <AddItem  setItemTitle={setCheckItemTitle}
          itemName="a CheckItem"
          btnText="Add CheckItem"/> 
      </Stack>


     {/* for showing delete CheckItem popup -------- */}
       <DeleteItem
          open={openCheckItemDialog}
          setOpen={setOpenCheckItemDialog}
          setIsClosed={setIsDeleted}
          itemName="CheckItem"
        />

    </>
        
  )
}

export default index;