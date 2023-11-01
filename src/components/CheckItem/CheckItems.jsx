import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddItem from "../common/AddItem";
import CheckItem from "./CheckItem";
import ProgressBar from "../common/ProgressBar";
import { Stack } from "@mui/material";

import { useErrorBoundary } from "react-error-boundary";

import {
  fetchCheckItems,
  createNewCheckItem,
  deleteCheckItem,
  updateCheckItem,
} from "../../app/features/checkItem/checkItemSlice";

const CheckItems = ({ checkListId }) => {
  const [progress, setProgress] = useState(0);

  const { showBoundary } = useErrorBoundary();
  const dispatch = useDispatch();
  let { checkItems, error } = useSelector((state) => state.checkItem);
  checkItems = checkItems[checkListId];

  useEffect(() => {
    dispatch(fetchCheckItems(checkListId));
  }, []);

  useEffect(() => {
    updateProgress();
  }, [checkItems]);

  // for creating checkItem ------------
  async function createCheckItem(checkItemTitle) {
    dispatch(createNewCheckItem({ checkListId, checkItemTitle }));
  }

  // for deleting checkItem ------------
  async function deleteSelectedCheckItem(checkItemId) {
    dispatch(deleteCheckItem({ checkListId, checkItemId }));
  }

  async function updateSelectedCheckItem(cardId, checkItemId, isChecked) {
    dispatch(updateCheckItem({ cardId, checkItemId, isChecked, checkListId }));
  }

  // for updating progressbar ---------------

  function updateProgress() {
    const totalComplete = checkItems?.reduce((totalComplete, currentOBj) => {
      if (currentOBj.state === "complete") {
        ++totalComplete;
      }
      return totalComplete;
    }, 0);

    if (checkItems?.length === 0) {
      setProgress(0);
    } else if (checkItems?.length > 0) {
      const progress = Math.floor((totalComplete * 100) / checkItems?.length);
      setProgress(progress);
    }
  }

  if (error) {
    showBoundary(error);
  }

  return (
    <>
      <ProgressBar progress={progress} />

      <Stack
        className="checklist-checkitems"
        sx={{
          width: "100%",
          justifyContent: "space-between",
          maxHeight: "20vh",
          overflowX: "auto",
        }}
      >
        {checkItems?.map((checkitem) => {
          return (
            <CheckItem
              info={checkitem}
              key={checkitem.id}
              deleteCheckItem={deleteSelectedCheckItem}
              updateCheckItem={updateSelectedCheckItem}
            />
          );
        })}
      </Stack>

      {/* checkItem creation box-------- */}
      <Stack className="addCheckItem-button">
        <AddItem
          createItem={createCheckItem}
          itemName="a CheckItem"
          btnText="Add CheckItem"
        />
      </Stack>
    </>
  );
};

export default CheckItems;
