import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Stack, Fab } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";

import Board from "../components/Board";
import BoardDialogbox from "../components/Board/BoardDialogbox";
import AlertMessage from "../components/common/AlertMessage";
import Loader from "../components/common/Loader";
import { useErrorBoundary } from "react-error-boundary";
import { fetchBoards, createNewBoard } from "../app/features/board/boardSlice";

const Boardpage = () => {
  const [isCreated, setIsCreated] = useState(false);

  const { showBoundary } = useErrorBoundary();

  const dispatch = useDispatch();
  const { loading, boards, error } = useSelector((state) => state.board);

  useEffect(() => {
    setTimeout(() => {
      // for getting all boards -----
      dispatch(fetchBoards());
    }, 1000);
  }, []);

  // for creating board-------
  async function createBoard(boardName) {
    dispatch(createNewBoard(boardName));
  }

  if (error) {
    showBoundary(error);
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsCreated(false);
  };

  // for loading -------
  if (loading) {
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
