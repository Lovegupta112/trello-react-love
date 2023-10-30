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

const initialState={
    checkLists:[]
}

const reducer=(state,action)=>{
  
}

const CheckListWindow = ({ cardId, cardName ,handleClose }) => {
  const [checkLists, setCheckLists] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

    const [checkListState,dispatch]=useReducer(reducer,initialState);

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
    setCheckLists(response.data);
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
    setCheckLists([...checkLists, response.data]);
    setIsCreated(true);
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
    setCheckLists(
      checkLists.filter((checkList) => checkList.id !== checkListId)
    );
    setIsDeleted(true);
  } catch (error) {
    showBoundary(error);
    console.log("Error: ", error);
  }
}
const handleCloseAlert = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setIsCreated(false);
  setIsDeleted(false);
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
          {checkLists.length > 0 ? (
            checkLists.map((checkList) => (
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
          isCompleted={isCreated}
         handleClose={handleCloseAlert}
          message={"SuccessFully CheckList Created !"}
        />

        {/* for showing alert message on successfully deletion of card ------- */}
        <AlertMessage
          isCompleted={isDeleted}
         handleClose={handleCloseAlert}
          message={"SuccessFully CheckList Deleted !"}
        />
      </DialogActions>
    </>
  );
};

export default CheckListWindow;
