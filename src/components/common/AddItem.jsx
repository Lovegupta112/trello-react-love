import React, { useState } from "react";
import {
  Box,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

const AddItem = ({ setItemTitle, itemName, btnText }) => {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleClose() {
    // setOpen(false);
    setExpanded(false);
    setName("");
  }

  function handleCreate() {
    setItemTitle(name);
    //  console.log(name);
    if (name) {
      setExpanded(false);
      setName("");
    }
  }

  return (
    <Box>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ boxShadow: "1px 1px 3px grey" }}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Button
            startIcon={<AddIcon />}
            sx={{ width: 250, height: "fit-content", wordBreak: "break-word" }}
          >
            {expanded ? `Enter ${itemName} Title` : `Add  ${itemName}`}
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            autoFocus
            value={name}
            margin="dense"
            onChange={(e) => setName(e.target.value)}
          />
          <Box padding={2}>
            <Button onClick={handleCreate} variant="contained">
              {btnText}
            </Button>
            <Button onClick={handleClose}>X</Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AddItem;
