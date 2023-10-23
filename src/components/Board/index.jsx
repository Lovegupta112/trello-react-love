import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

const randomThings = [ "nature", "sea", "buildings", "weather"];
const randomThing =
  randomThings[Math.floor(Math.random() * randomThings.length)];

const index = ({ board }) => {
  // console.log({ board });
  const {name,id}=board;
  return (
    <Card sx={{ width: "300px", backgroundColor: "", boxShadow: 2 }} id={id} className="board"> 
      <CardActionArea>
        <CardContent>
          <Typography variant="h5">{name}</Typography>
        </CardContent>
        <CardMedia
          component="img"
          src={`https://source.unsplash.com/random/${randomThing}`}
          height="140"
          alt="board-image"
        />
      </CardActionArea>
    </Card>
  );
};

export default index;
