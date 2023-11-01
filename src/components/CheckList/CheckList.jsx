import { useEffect, useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckItems from "../CheckItem/CheckItems";


const CheckList = ({ checkListInfo , deleteCheckList}) => {
  const { name, id } = checkListInfo;

  function handleClick(){
    deleteCheckList(id);
  }


  return (
    <Stack
      sx={{
        alignItems: "center",
        padding: "1rem 0.3rem",
        // border: "1px solid black",
      }}
      id={id}
      className="checklist"
      spacing={2}
    >
      <Stack
        className="checklist-header"
        direction="row"
        sx={{ width: "100%", justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <CheckBoxOutlinedIcon />
          <Typography variant="h6">{name}</Typography>
        </Stack>
        <Button
          variant="contained"
          className="delete-checklist-btn"
          sx={{
            backgroundColor: "var(--light-grey)",
            color: "black",
            "&:hover": { backgroundColor: "crimson" },
          }}
          onClick={handleClick}
        >
          Delete
        </Button>
      </Stack>

      {/* checkItems --------- */}
      <CheckItems checkListId={id} />
    </Stack>
  );
};

export default CheckList;