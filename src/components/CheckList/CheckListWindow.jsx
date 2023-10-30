import React, { useState, useEffect , useReducer} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import AddItem from "../common/AddItem";
import CheckList from "./CheckList";
import AlertMessage from "../common/AlertMessage";


import { useErrorBoundary } from "react-error-boundary";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

const ACTIONS={
   FETCH_CHECKLISTS:'fetch_checklists',
   CREATE_CHECKLIST:'create_checklist',
   DELETE_CHECKLIST:'delete_checklist',
   SET_CHECKLIST_CREATED:'set_checklist_created',
   SET_CHECKLIST_DELETED:'set_checklist_deleted'
}
const initialState={
   checkLists:[],
   isCreated:false,
   isDeleted:false
}

const reducer=(state,action)=>{
   switch(action.type){
     case ACTIONS.FETCH_CHECKLISTS:
        return {...state,checkLists:action.payload};
     case ACTIONS.CREATE_CHECKLIST:
         return {...state,checkLists:[...state.checkLists, action.payload],isCreated:true,isDeleted:false};
     case ACTIONS.DELETE_CHECKLIST:
         return {...state,checkLists:state.checkLists.filter((checkList)=>checkList.id!==action.payload),isDeleted:true,isCreated:false};
     case ACTIONS.SET_CHECKLIST_CREATED:
        return {...state,isCreated:action.payload};
      case ACTIONS.SET_CHECKLIST_DELETED:
          return {...state,isDeleted:action.payload};
     default:
        return state;
   }
}
const CheckListWindow = ({ cardId, cardName ,handleClose }) => {

  const [state,dispatch]=useReducer(reducer,initialState);
  const { showBoundary } = useErrorBoundary();

  
  useEffect(() => {
    getAllCheckLists();
  }, []);


  // get all checkLists --------
async function getAllCheckLists() {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`
    );
    dispatch({type:ACTIONS.FETCH_CHECKLISTS,payload:response.data});
  } catch (error) {
    showBoundary(error);
    console.log("Error: ", error);
  }
}


// create new checkList------
async function createCheckList(checkListTitle) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}&name=${checkListTitle}`
    );
    
    dispatch({type:ACTIONS.CREATE_CHECKLIST,payload:response.data});
  } catch (error) {
    showBoundary(error);
    console.log("Error: ", error);
  }
}

// delete checkList -----------
async function deleteCheckList(checkListId) {
  try {
    const response = await axios.delete(
      `https://api.trello.com/1/checklists/${checkListId}?key=${apiKey}&token=${apiToken}`
    );
    dispatch({type:ACTIONS.DELETE_CHECKLIST,payload:checkListId});
  } catch (error) {
    showBoundary(error);
    console.log("Error: ", error);
  }
}
const handleCloseAlert = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  dispatch({type:ACTIONS.SET_CHECKLIST_CREATED,payload:false});
  dispatch({type:ACTIONS.SET_CHECKLIST_DELETED,payload:false});
};


  return (
    <>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <DialogTitle>
          {/* <Typography  variant='h5' sx={{size:'20px',fontWeight:'500'}} >{cardName}</Typography> */}
          {cardName}
        </DialogTitle>
        <IconButton onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Stack>

      {/* for showing add checklist popup ------- */}
      <Stack
        direction="row"
        sx={{
          minHeight: "10vh",
          justifyContent: "space-between",
          padding: "1rem",
          position: "relative",
          zIndex: "100",
        }}
      >
        <Typography variant="h5">CheckLists: </Typography>
        <AddItem
          createItem={createCheckList}
          itemName="a CheckList"
          btnText="Add CheckList"
        />
      </Stack>

      {/* for showing checklist - */}

      <DialogContent
        sx={{
          display: "flex",
          minHeight: "70vh",
          width: "900px",
          flexWrap: "wrap",
        }}
      >
        <Stack
          spacing={2}
          className="checkList-container"
          data-cardid={cardId}
          sx={{ width: "60%" }}
        >
          {state.checkLists.length > 0 ? (
            state.checkLists.map((checkList) => (
              <CheckList key={checkList.id} checkListInfo={checkList} deleteCheckList={deleteCheckList} />
            ))
          ) : (
            <Typography variant="h6" sx={{ color: "crimson" }}>
              No CheckList Present !
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        
        {/* for showing alert message on successfully creation of CheckList ------- */}
        <AlertMessage
          isCompleted={state.isCreated}
         handleClose={handleCloseAlert}
          message={"SuccessFully CheckList Created !"}
        />

        {/* for showing alert message on successfully deletion of card ------- */}
        <AlertMessage
          isCompleted={state.isDeleted}
         handleClose={handleCloseAlert}
          message={"SuccessFully CheckList Deleted !"}
        />
      </DialogActions>
    </>
  );
};

export default CheckListWindow;
