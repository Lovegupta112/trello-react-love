import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  fetchCheckLists,
  createNewCheckList,
  deleteCheckList,
} from "../../app/features/checkList/checkListSlice";

const CheckListWindow = ({ cardId, cardName, handleClose }) => {
  const [isCreated, setIsCreated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // const state = useSelector((state) => state.checkList);
  const { checkLists, error } = useSelector((state) => state.checkList);
 
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    // get all checkLists --------
      dispatch(fetchCheckLists(cardId));
  }, []);

  // create new checkList------
  function createCheckList(checkListTitle) {
    dispatch(createNewCheckList({cardId, checkListTitle}));
    setIsCreated(true);
  }

  // delete checkList -----------
  function deleteSelectedCheckList(checkListId) {
    dispatch(deleteCheckList(checkListId));
    setIsDeleted(true);
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsCreated(false);
    setIsDeleted(false);
  };

  if (error) {
    showBoundary(error);
  }

  return (
    <>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <DialogTitle>{cardName}</DialogTitle>
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
          {checkLists?.length > 0 ? (
            checkLists?.map((checkList) => (
              <CheckList
                key={checkList.id}
                checkListInfo={checkList}
                deleteCheckList={deleteSelectedCheckList}
              />
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
