import { Paper, Stack, Button, Typography, TextField } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Card from "../Card";

const index = ({ list }) => {
  return (
    <Stack
      sx={{
        minWidth: 270,
        height: "fit-content",
        maxHeight: "70vh",
        padding: "1rem 0.5rem",
        backgroundColor: "#f0f8fff5",
        borderRadius: "10px",
      }}
      className="list"
    >
      <Stack elevation={3} spacing={2} sx={{ overflowY: "scroll" }}>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography>{list.name}</Typography>
          <Button className="list-setting-btn" id={list.id}>
            <MoreHorizIcon />
          </Button>
        </Stack>

        {/* cards list --------------- */}
        <Card listId={list.id} />
      </Stack>
    </Stack>
  );
};

export default index;
