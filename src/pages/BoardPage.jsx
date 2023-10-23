import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Stack,Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Board from "../components/Board";
import BoardDialogbox from "../components/Board/BoardDialogbox";
import AlertMessage from "../components/common/AlertMessage";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

// for getting all boards ------
async function getAllBoards(setBoards) {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/boards?&key=${apiKey}&token=${apiToken}`
    );
    // console.log('Boards',response.data);
    setBoards(response.data);
  } catch (error) {
    console.log("Error: ", error);
  }
}

// for creating board-------
async function createBoard(boards,setBoards,boardName, setBoardName,setIsCreated) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${apiToken}`
    );

    setBoards([...boards,response.data]);
    setBoardName("");
    setIsCreated(true);
  } catch (error) {
    console.log("Error: ", error);

  }
}


const Boardpage = () => {
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = useState(false);
  const [isCreated,setIsCreated]=useState(false);
  const [boardName, setBoardName] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    getAllBoards(setBoards);
  },[]);


  // for creating board if boardname is exist ---------
  if (boardName) {
    createBoard(boards,setBoards,boardName, setBoardName,setIsCreated);
  }

  // for opening particular board ---------
  function handleClick(e) {
    if (e.target.closest(".board")) {
      const id = e.target.closest(".board").id;
      navigate(`/boards/${id}`);
    }
  }


  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      flexWrap="wrap"
      useFlexGap
      my={3}
      spacing={{ xs: 2, sm: 2, md: 3, lg: 3, Xl: 5 }}
      sx={{
        alignItems: "flex-start",
        padding: "2rem",
      }}
      className="boards-container"
      onClick={(e) => handleClick(e)}
  >
      {boards.map((board) => (
        <Board
          board={board}
          key={board.id}
          sx={{
            width: {
              xs: "95%",
              sm: "90%",
              md: "48%",
              lg: "30%",
              xl: "30%",
            },
          }}
        />
      ))}

      {/* for showing board creation dialog box --------- */}
      <BoardDialogbox
        open={open}
        setOpen={setOpen}
        setBoardName={setBoardName}
      />

      {/* for showing alert message ------- */}
      <AlertMessage isCompleted={isCreated} setIsCompleted={setIsCreated} message='SuccessFully Board Created !'/>
      <Fab
        color="primary"
        variant="extended"
        aria-label="create board"
        sx={{ position: "fixed", right: "20px", bottom: "20px" }}
        onClick={() => setOpen(true)}
      >
        {/* for showing create board button ------ */}
        <AddIcon sx={{ mr: 1 }} />
        Create Board
      </Fab>
    </Stack>
  );
};

export default Boardpage;
