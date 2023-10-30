import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Stack, Fab } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";

import Board from "../components/Board";
import BoardDialogbox from "../components/Board/BoardDialogbox";
import AlertMessage from "../components/common/AlertMessage";
import Loader from "../components/common/Loader";
import { useErrorBoundary } from "react-error-boundary";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;




const Boardpage = () => {
  const [boards, setBoards] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [loader, setLoader] = useState(true);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    setTimeout(() => {
      getAllBoards();
    }, 1000);
  }, []);

  // for getting all boards ------
  async function getAllBoards() {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/members/me/boards?&key=${apiKey}&token=${apiToken}`
      );
      setBoards(response.data);
    } catch (error) {
      showBoundary(error);
    }
    setLoader(false);
  }

  // for creating board-------
  async function createBoard(boardName) {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${apiToken}`
      );

      setBoards([...boards, response.data]);
      setIsCreated(true);
    } catch (error) {
      console.log("Error: ", error);
      showBoundary(error);
    }
  }


  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsCreated(false);
  };

  
  // for loader -------
  if (loader) {
    return <Loader />;
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
    >
      {boards.map((board) => (
        <Link to={`/boards/${board.id}`} key={board.id}>
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
        </Link>
      ))}

      {/* for showing board creation dialog box --------- */}
      <BoardDialogbox createBoard={createBoard} />

      {/* for showing alert message ------- */}
       <AlertMessage
        message="SuccessFully Board Created !"
        isCompleted={isCreated}
        handleClose={handleCloseAlert}
      />
     
    </Stack>
  );
};

export default Boardpage;
