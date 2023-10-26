import React, { useState } from "react";
import {
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

async function updateCheckItem(cardId, checkItemId, isChecked) {
  try {
    await axios.put(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${apiKey}&token=${apiToken}&state=${
        isChecked ? "complete" : "incomplete"
      }`
    );
  } catch (error) {
    console.log("Error: ", error);
  }
}

const CheckItem = ({ info, setCheckItems, setIsChanged }) => {
  const { id, name, state } = info;

  const [checked, setChecked] = useState(state === "incomplete" ? false : true);

  function handleChange(event) {
    const isChecked = event.target.checked;
    const cardId = event.target.closest(".checkList-container")?.dataset.cardid;
    const checkItemId = event.target.closest(".checkItem")?.dataset.checkitem;
    setChecked(isChecked);
    updateCheckItem(cardId, checkItemId, isChecked);
    setIsChanged(true);
    setCheckItems((checkItems) => {
      return checkItems.map((checkItem) => {
        if (checkItem.id == checkItemId) {
          checkItem.state = isChecked ? "complete" : "incomplete";
        }
        return checkItem;
      });
    });
  }

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        backgroundColor: "var(--light-grey)",
      }}
      className="checkItem"
      data-checkitem={id}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label={name}
        sx={{ flexGrow: "1" }}
      />
      <IconButton className="delete-checkItem-btn">
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default CheckItem;
