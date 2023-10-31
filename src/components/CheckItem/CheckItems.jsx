import React, { useState, useEffect } from "react";
import axios from "axios";
import AddItem from "../common/AddItem";
import CheckItem from "./CheckItem";
import ProgressBar from "../common/ProgressBar";
import { Stack } from "@mui/material";

import { useErrorBoundary } from "react-error-boundary";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;



const CheckItems = ({ checkListId }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [progress, setProgress] = useState(0);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    getAllCheckItems();
  }, []);

  // for getting all checkItems------
  async function getAllCheckItems() {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${apiToken}`
      );
      setCheckItems(response.data);
      if (response.data.length > 0) {
        updateProgress(response.data);
      }
    } catch (error) {
      showBoundary(error);
      console.log("Error: ", error);
    }
  }

  // for creating checkItem ------------
  async function createCheckItem(checkItemTitle) {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemTitle}&key=${apiKey}&token=${apiToken}`
      );
      const updatedCheckItems=[...checkItems, response.data];
      setCheckItems(updatedCheckItems);
      updateProgress(updatedCheckItems);
    } catch (error) {
      showBoundary(error);
      console.log("Error: ", error);
    }
  }

  // for deleting checkItem ------------
  async function deleteCheckItem(checkItemId) {
    try {
      const response = await axios.delete(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${apiKey}&token=${apiToken}`
      );
       const updatedCheckItems=  checkItems.filter((checkItem) => checkItem.id !== checkItemId);
      setCheckItems(updatedCheckItems);
      updateProgress(updatedCheckItems);
    } catch (error) {
      showBoundary(error);
      console.log("Error: ", error);
    }
  }

  async function updateCheckItem(cardId, checkItemId, isChecked) {
    try {
      const updatedCheckItems=checkItems.map((checkItem) => {
        if (checkItem.id == checkItemId) {
          checkItem.state = isChecked ? "complete" : "incomplete";
        }
        return checkItem;
      })
      setCheckItems(updatedCheckItems);
      updateProgress(updatedCheckItems);
      await axios.put(
        `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${apiKey}&token=${apiToken}&state=${
          isChecked ? "complete" : "incomplete"
        }`
      );
    } catch (error) {
      showBoundary(error);
      console.log("Error: ", error);
    }
  }

 

  // for updating progressbar ---------------

function updateProgress(checkItems) {
  const totalComplete = checkItems?.reduce((totalComplete, currentOBj) => {
    if (currentOBj.state === "complete") {
      ++totalComplete;
    }
    return totalComplete;
  }, 0);
  
  if (checkItems?.length === 0) {
    setProgress(0);
  } else if(checkItems?.length>0) {
    const progress = Math.floor((totalComplete * 100) / checkItems?.length);
    setProgress(progress);
  }
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
        {checkItems.map((checkitem) => {
          return (
            <CheckItem
              info={checkitem}
              key={checkitem.id}
              deleteCheckItem={deleteCheckItem}
              updateCheckItem={updateCheckItem}
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
