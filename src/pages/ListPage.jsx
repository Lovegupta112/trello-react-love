import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Stack, Typography } from "@mui/material";
import List from "../components/List";
import AddList from "../components/List/AddList";
import AlertMessage from "../components/common/AlertMessage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeleteList from "../components/List/DeleteList";
// import AddIcon from "@mui/icons-material/Add";
// import AddItem from '../components/common/AddItem';

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

// for getting all lists of particular board -----------
async function getAllLists(id, setLists, setError) {
  try {
    const repsonse = await axios.get(
      `https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${apiToken}`
    );
    setLists(repsonse.data);
    setError(false);
  } catch (error) {
    setError(true);
    console.log("Error: ", error);
  }
}

//for getting board info -----
async function getBoardInfo(id, setBoardName) {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/boards/${id}?key=${apiKey}&token=${apiToken}`
    );
    // console.log(response.data);
    setBoardName(response.data.name);
  } catch (error) {
    console.log("Error: ", error);
  }
}

// for creating list ---------
async function createList(
  lists,
  setLists,
  id,
  listName,
  setListName,
  setIsCreated
) {
  try {
    // const response= await axios.post(`https://api.trello.com/1/boards/${id}/lists?name=${listName}&key=${apiKey}&token=${apiToken}`);
    const response = await axios.post(
      `https://api.trello.com/1/lists?name=${listName}&idBoard=${id}&key=${apiKey}&token=${apiToken}`
    );
    setLists([...lists, response.data]);
    setListName("");
    setIsCreated(true);
  } catch (error) {
    console.log("Error: ", error);
  }
}

// for deleting/archive list ----
// working on it ----------
async function deleteList(listId, setListId, lists, setLists, setIsClosed) {
  try {
    const response = await axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${apiToken}`
    );
    console.log("Deleted List: ", response.data);
    setLists(lists.filter((list) => list.id !== id));
    setIsClosed(true);
    setListId("");
  } catch (error) {
    console.log("Error: ", error);
  }
}

// main component ------------------
const ListPage = () => {
  const { id } = useParams();
  const [lists, setLists] = useState([]);
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [listId, setListId] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllLists(id, setLists, setError);
    getBoardInfo(id, setBoardName);
  }, []);

  // creating list if listname is exist ------
  if (listName) {
    createList(lists, setLists, id, listName, setListName, setIsCreated);
  }

  // delete list if listid exists and isclosed are true ------
  if (isClosed && listId) {
    deleteList(listId, setListId, lists, setLists, setIsClosed);
  }

  function handleClick(e) {
    // for navigate back to boards page-----
    if (e.target.closest(".back-btn")) {
      navigate("/boards");
    }

    if (e.target.closest(".list-setting-btn")) {
      //  console.log(e.target.closest('.list-setting-btn'));
      const id = e.target.closest(".list-setting-btn").id;
      setListId(id);
      setOpen(true);
    }
  }

  // if api throw error when we use incorrect id for fetching list ---------
  if (error) {
    return (
      <Box sx={{ padding: "2rem 1rem" }} onClick={(e) => handleClick(e)}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          className="back-btn"
        >
          Back
        </Button>
        <Typography
          variant="h5"
          className="lists-api-error"
          sx={{ textAlign: "center", lineHeight: "2", padding: "2rem 1rem" }}
        >
          "Apologies, there seems to be an issue retrieving the Lists data.
          <br /> Please try again later."
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ padding: "1rem" }} onClick={(e) => handleClick(e)}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          className="back-btn"
        >
          Back
        </Button>
        <Button variant="contained" startIcon={<DashboardIcon />}>
          {boardName}
        </Button>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        padding={2}
        className="lists-container"
      >
        {lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
        {/* <Button direction='row' startIcon={<AddIcon />} sx={{minWidth:200,height:'fit-content',padding:'1rem',backgroundColor:'lightgrey'}} onClick={()=>setOpen(true)}>Add Another List</Button> */}
        {/* <AddItem open={open} setOpen={setOpen} setListName={setListName}/> */}

        {/* for adding new list  ------ */}
        <AddList setListName={setListName} />

        {/* for showing delete list popup -------- */}
        <DeleteList open={open} setOpen={setOpen} setIsClosed={setIsClosed} />

        {/* for showing alert message on successfully creation of list ------- */}
        <AlertMessage
          isCompleted={isCreated}
          setIsCompleted={setIsCreated}
          message={"SuccessFully List Created !"}
        />
        {/* for showing alert message on successfully deletion of list ------- */}
        {/* <AlertMessage isCompleted={isClosed} setIsCompleted={setIsClosed} message={'SuccessFully List Closed !'}/> */}
      </Stack>
    </Box>
  );
};

export default ListPage;
