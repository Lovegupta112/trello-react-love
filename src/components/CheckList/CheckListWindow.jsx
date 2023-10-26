import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Stack,
  Box,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import AddItem from "../common/AddItem";
import CheckList from "./CheckList";
import AlertMessage from "../common/AlertMessage";
import DeleteItem from "../common/DeleteItem";

import { useErrorBoundary } from "react-error-boundary";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

// get all checkLists --------
async function getAllCheckLists(cardId, setCheckLists,showBoundary) {
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
async function createCheckList(
  cardId,
  checkListTitle,
  setCheckListTitle,
  checkLists,
  setCheckLists,
  setIsCreated,
  showBoundary
) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}&name=${checkListTitle}`
    );
    setCheckLists([...checkLists, response.data]);
    setCheckListTitle("");
    setIsCreated(true);
  } catch (error) {
    showBoundary(error);
    console.log("Error: ", error);
  }
}

// delete checkList -----------
async function deleteCheckList(
  checkListId,
  setCheckListId,
  checkLists,
  setCheckLists,
  setIsDeleted,
  showBoundary
) {
  try {
    const response = await axios.delete(
      `https://api.trello.com/1/checklists/${checkListId}?key=${apiKey}&token=${apiToken}`
    );
    setCheckLists(
      checkLists.filter((checkList) => checkList.id !== checkListId)
    );
    setIsDeleted(true);
    setCheckListId("");
  } catch (error) {
    showBoundary(error);
    console.log("Error: ", error);
  }
}

const CheckListWindow = ({ open, setOpen, cardId ,cardName}) => {
  const [checkLists, setCheckLists] = useState([]);
  const [checkListTitle, setCheckListTitle] = useState("");
  const [openCheckListDialog, setOpenChecklistDialog] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [checkListId, setCheckListId] = useState("");

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    getAllCheckLists(cardId, setCheckLists,showBoundary);
  }, []);

  if (checkListTitle) {
    createCheckList(
      cardId,
      checkListTitle,
      setCheckListTitle,
      checkLists,
      setCheckLists,
      setIsCreated,
      showBoundary
    );
  }

  if (isDeleted && checkListId) {
    deleteCheckList(
      checkListId,
      setCheckListId,
      checkLists,
      setCheckLists,
      setIsDeleted,
      showBoundary
    );
  }

  // for deleting checklist -----------
  function handleClick(e) {
    const id = e.target.closest(".checklist")?.id;
    // console.log('checklistId: ',id);
    if (e.target.closest(".delete-checklist-btn")) {
      setCheckListId(id);
      setOpenChecklistDialog(true);
    }
  }
  function handleClose() {
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      onClick={(e) => handleClick(e)}
    >
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
        sx={{ minHeight: "10vh", justifyContent: "space-between", padding: "1rem" ,position:'relative',zIndex:'100'}}
      >
        <Typography variant="h5">CheckLists: </Typography>
        <AddItem
          setItemTitle={setCheckListTitle}
          itemName="a CheckList"
          btnText="Add CheckList"
        />
      </Stack>

      {/* for showing checklist - */}

      <DialogContent
        sx={{ display: "flex", minHeight: "70vh", width: "900px",flexWrap:'wrap' }}
      >
        <Stack
          spacing={2}
          className="checkList-container"
          data-cardid={cardId}
          sx={{ width: "60%" }}
        >
          {checkLists.length>0 ? 
           checkLists.map((checkList) => (
            <CheckList key={checkList.id} checkListInfo={checkList} />
          )): 
           <Typography variant="h6" sx={{color:'crimson'}}>No CheckList Present !</Typography>
           }
        </Stack>

      </DialogContent>

      <DialogActions>

        {/* for showing delete CheckList popup -------- */}
        <DeleteItem
          open={openCheckListDialog}
          setOpen={setOpenChecklistDialog}
          setIsClosed={setIsDeleted}
          itemName="CheckList"
        />
        {/* for showing alert message on successfully creation of CheckList ------- */}
        <AlertMessage
          isCompleted={isCreated}
          setIsCompleted={setIsCreated}
          message={"SuccessFully CheckList Created !"}
        />

        {/* for showing alert message on successfully deletion of card ------- */}
        <AlertMessage
          isCompleted={isDeleted}
          setIsCompleted={setIsDeleted}
          message={"SuccessFully CheckList Deleted !"}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CheckListWindow;
