import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import AddItem from "../common/AddItem";
import CheckItem from "./CheckItem";
import ProgressBar from "../common/ProgressBar";
import { Stack } from "@mui/material";

import { useErrorBoundary } from "react-error-boundary";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

const ACTIONS = {
  FETCH_CHECKITEMS: "fetch_checkitems",
  CREATE_CHECKITEM: "create_checkitem",
  DELETE_CHECKITEM: "delete_checkitem",
  UPDATE_CHECKITEM: "update_checkitem",
  UPDATE_PROGRESS: "update_progress",
};
const initialState = {
  checkItems: [],
  progress: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_CHECKITEMS:
      return { ...state, checkItems: action.payload };
    case ACTIONS.CREATE_CHECKITEM:
      const newCheckItems = [...state.checkItems, action.payload];
      return { ...state, checkItems: newCheckItems };
    case ACTIONS.DELETE_CHECKITEM:
      return {
        ...state,
        checkItems: state.checkItems.filter(
          (checkItem) => checkItem.id !== action.payload
        ),
      };
    case ACTIONS.UPDATE_CHECKITEM:
      const { checkItemId, isChecked } = action.payload;
      const updatedCheckItems = state.checkItems.map((checkItem) => {
        if (checkItem.id == checkItemId) {
          checkItem.state = isChecked ? "complete" : "incomplete";
        }
        return checkItem;
      });
      return { ...state, checkItems: updatedCheckItems };
    case ACTIONS.UPDATE_PROGRESS:
      const totalComplete = state.checkItems?.reduce(
        (totalComplete, currentOBj) => {
          if (currentOBj.state === "complete") {
            ++totalComplete;
          }
          return totalComplete;
        },
        0
      );

      const progress =
        state.checkItems.length > 0
          ? Math.floor((totalComplete * 100) / state.checkItems?.length)
          : 0;
      return { ...state, progress: progress };
    default:
      return state;
  }
};

const CheckItems = ({ checkListId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    getAllCheckItems();
  }, []);

  // for getting all checkItems------------
  async function getAllCheckItems() {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${apiToken}`
      );
      dispatch({ type: ACTIONS.FETCH_CHECKITEMS, payload: response.data });
      dispatch({ type: ACTIONS.UPDATE_PROGRESS });
    } catch (error) {
      showBoundary(error);
      console.log("Error: ", error);
    }
  }

  // for creating checkItem ------------
  async function createCheckItem(checkItemTitle) {
    try {// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
      const response = await axios.post(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemTitle}&key=${apiKey}&token=${apiToken}`
      );
      dispatch({ type: ACTIONS.CREATE_CHECKITEM, payload: response.data });
      dispatch({ type: ACTIONS.UPDATE_PROGRESS });
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
      dispatch({ type: ACTIONS.DELETE_CHECKITEM, payload: checkItemId });
      dispatch({ type: ACTIONS.UPDATE_PROGRESS });
    } catch (error) {
      showBoundary(error);
      console.log("Error: ", error);
    }
  }

  // for updating checkitem based on checkbox-------
  async function updateCheckItem(cardId, checkItemId, isChecked) {
    try {
      dispatch({
        type: ACTIONS.UPDATE_CHECKITEM,
        payload: { checkItemId, isChecked },
      });
      dispatch({ type: ACTIONS.UPDATE_PROGRESS });
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

  return (
    <>
      <ProgressBar progress={state.progress} />

      <Stack
        className="checklist-checkitems"
        sx={{
          width: "100%",
          justifyContent: "space-between",
          maxHeight: "20vh",
          overflowX: "auto",
        }}
      >
        {state.checkItems.map((checkitem) => {
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
