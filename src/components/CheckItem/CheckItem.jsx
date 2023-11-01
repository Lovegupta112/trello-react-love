import React, { useState } from "react";
import {
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const CheckItem = ({ info,deleteCheckItem,updateCheckItem}) => {
  const { id, name, state } = info;

  const [checked, setChecked] = useState(state === "incomplete" ? false : true);

 
  function handleChange(event) {
    const isChecked = event.target.checked;
    const cardId = event.target.closest(".checkList-container")?.dataset.cardid;
    const checkItemId = event.target.closest(".checkItem")?.dataset.checkitem;

    setChecked(isChecked);
    updateCheckItem(cardId, checkItemId, isChecked);
  }

  function handleClick(){
    deleteCheckItem(id);
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
      <IconButton className="delete-checkItem-btn" onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default CheckItem;