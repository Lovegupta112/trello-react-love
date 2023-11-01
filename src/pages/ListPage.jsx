import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Box, Button, Stack, Typography } from "@mui/material";
import List from "../components/List";
import AddItem from "../components/common/AddItem";
import AlertMessage from "../components/common/AlertMessage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Loader from "../components/common/Loader";
import { useErrorBoundary } from "react-error-boundary";

import {
  fetchLists,
  createNewList,
  deleteSelectedList,
} from "../app/features/list/listSlice";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

// main component ------------------
const ListPage = () => {
  const { id } = useParams();
  const [isCreated, setIsCreated] = useState(false);
  const [board, setBoardInfo] = useState("");
  const [isClosed, setIsClosed] = useState(false);

  const { showBoundary } = useErrorBoundary();
  const { loading, lists, error } = useSelector((state) => state.list);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchLists(id));
      getBoardInfo();
  }, []);

  //for getting board info -----
  async function getBoardInfo() {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/boards/${id}?key=${apiKey}&token=${apiToken}`
      );
      setBoardInfo(response.data);
    } catch (error) {
      console.log("Error: ", error);
      showBoundary(error);
    }
  }

  // for creating list ---------
  async function createList(listName) {
    dispatch(createNewList({ listName, id }));
    setIsCreated(true);
  }

  // for deleting/archive list ----
  async function deleteList(listId) {
    dispatch(deleteSelectedList(listId));
    setIsClosed(true);
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsCreated(false);
    setIsClosed(false);
  };

  // if(loader){
  if (loading) {
    return <Loader />;
  }

  if (error) {
    showBoundary(error);
  }

  const { name, prefs } = board;

  return (
    <Box
      sx={{
        paddingTop: "1rem",
        backgroundColor: prefs?.backgroundColor,
        backgroundImage: `url(${prefs?.backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Stack direction="row" spacing={2} padding={2}>
        <Link to="/boards">
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            className="back-btn"
          >
            Back
          </Button>
        </Link>

        <Button variant="contained" startIcon={<DashboardIcon />}>
          {name}
        </Button>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        padding={2}
        className="lists-container"
      >
        {lists &&
          lists.map((list) => (
            <List key={list.id} list={list} deleteList={deleteList} />
          ))}

        {/* for adding new list  ------ */}
        <AddItem createItem={createList} itemName="a List" btnText="Add List" />

        {/* for showing alert message on successfully creation of list ------- */}
        <AlertMessage
          isCompleted={isCreated}
          handleClose={handleCloseAlert}
          message={"SuccessFully List Created !"}
        />
        {/* for showing alert message on successfully deletion of list ------- */}
        <AlertMessage
          isCompleted={isClosed}
          handleClose={handleCloseAlert}
          message={"SuccessFully List Archived !"}
        />
      </Stack>
    </Box>
  );
};

export default ListPage;
