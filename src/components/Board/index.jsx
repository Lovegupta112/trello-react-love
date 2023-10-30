import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const index = ({ board }) => {
  const {
    name,
    id,
    prefs: { backgroundImageScaled, backgroundColor },
  } = board;
  return (
    <Card
      sx={{
        width: "300px",
        backgroundColor: "",
        boxShadow: 2,
        cursor: "pointer",
      }}
      id={id}
      className="board"
    >
      {backgroundImageScaled ? (
        <CardMedia
          component="img"
          src={backgroundImageScaled[1].url}
          height="140"
          alt="board-image"
        />
      ) : (
        <CardMedia
          sx={{ height: "140px", backgroundColor }}
          component="section"
        />
      )}
      <CardContent>
        <Typography variant="h5">{name}</Typography>
      </CardContent>
    </Card>
  );
};

export default index;
