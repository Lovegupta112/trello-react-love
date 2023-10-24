import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const CheckList = ({ checkListInfo }) => {
  const { name, id } = checkListInfo;
  // console.log(name,id);
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0.3rem",
        border: "1px solid black",
      }}
      id={id}
      className="checklist"
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
      >
        Delete
      </Button>
    </Stack>
  );
};

export default CheckList;
