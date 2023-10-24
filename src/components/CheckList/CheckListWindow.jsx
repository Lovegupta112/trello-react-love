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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import AddItem from "../common/AddItem";
import CheckList from "./CheckList";
import AlertMessage from "../common/AlertMessage";
import DeleteItem from "../common/DeleteItem";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

// get all checkLists --------
async function getAllCheckLists(cardId, setCheckLists) {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`
    );
    setCheckLists(response.data);
  } catch (error) {
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
  setIsCreated
) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}&name=${checkListTitle}`
    );
    setCheckLists([...checkLists, response.data]);
    setCheckListTitle("");
    setIsCreated(true);
  } catch (error) {
    console.log("Error: ", error);
  }
}

// delete checkList -----------
async function deleteCheckList(
  checkListId,
  setCheckListId,
  checkLists,
  setCheckLists,
  setIsDeleted
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
    console.log("Error: ", error);
  }
}

const CheckListWindow = ({ open, setOpen, cardId }) => {
  const [checkLists, setCheckLists] = useState([]);
  const [checkListTitle, setCheckListTitle] = useState("");
  const [openCheckListDialog, setOpenChecklistDialog] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [checkListId, setCheckListId] = useState("");

  useEffect(() => {
    getAllCheckLists(cardId, setCheckLists);
  }, []);

  if (checkListTitle) {
    createCheckList(
      cardId,
      checkListTitle,
      setCheckListTitle,
      checkLists,
      setCheckLists,
      setIsCreated
    );
  }

  if (isDeleted && checkListId) {
    deleteCheckList(
      checkListId,
      setCheckListId,
      checkLists,
      setCheckLists,
      setIsDeleted
    );
  }

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
        <DialogTitle>Card Name</DialogTitle>
        <IconButton onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Stack>

      {/* for showing add checklist popup ------- */}
      <Stack
        direction="row"
        sx={{ minHeight: "10vh", justifyContent: "flex-end", padding: "1rem" }}
      >
        <AddItem
          setItemTitle={setCheckListTitle}
          itemName="a CheckList"
          btnText="Add CheckList"
        />
      </Stack>

      {/* for showing checklist - */}
      <DialogContent
        sx={{ display: "flex", minHeight: "70vh", width: "900px" }}
      >
        <Stack
          spacing={2}
          className="checkList-container"
          sx={{ width: "60%" }}
        >
          {checkLists.map((checkList) => (
            <CheckList key={checkList.id} checkListInfo={checkList} />
          ))}
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
