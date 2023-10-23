import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NoMatchPage = () => {
  const navigate = useNavigate();

  function handleClick(e) {
    // for navigate back to boards page-----
    if (e.target.closest(".back-btn")) {
      navigate("/boards");
    }
  }

  return (
    <Box onClick={(e) => handleClick(e)} sx={{ padding: "2rem 1rem" }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        className="back-btn"
      >
        Back To Boards
      </Button>
      <Typography
        variant="h5"
        className="page-not-found-heading"
        sx={{ textAlign: "center", lineHeight: "2", padding: "2rem 1rem" }}
      >
        "Sorry, the page you're looking for cannot be found.
        <br />
        Please check the URL or navigate back to the homepage."
      </Typography>
    </Box>
  );
};

export default NoMatchPage;
