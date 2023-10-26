import { useEffect, useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckItem from "../CheckItem/CheckItems";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

const CheckList = ({ checkListInfo }) => {
  const { name, id } = checkListInfo;

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
        >
          Delete
        </Button>
      </Stack>

      {/* checkItems --------- */}
      <CheckItem checkListId={id} />
    </Stack>
  );
};

export default CheckList;
