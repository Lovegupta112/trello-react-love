import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Stack, Typography } from "@mui/material";
import List from "../components/List";
import AddItem from "../components/common/AddItem";
import AlertMessage from "../components/common/AlertMessage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Loader from "../components/common/Loader";
import { useErrorBoundary } from "react-error-boundary";


const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;


// main component ------------------
const ListPage = () => {
  const { id } = useParams();
  const [lists, setLists] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [board, setBoardInfo] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [loader,setLoader]=useState(true);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    setTimeout(()=>{
      getAllLists();
      getBoardInfo();
    },1000)
   
  }, []);



  // for getting all lists of particular board -----------
async function getAllLists() {
  try {
    const repsonse = await axios.get(
      `https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${apiToken}` //token
    );
    setLists(repsonse.data);
  } catch (error) {
    console.log("Error: ", error);
    showBoundary(error);
  }
  setLoader(false);
}

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
  try {
    const response = await axios.post(
      `https://api.trello.com/1/lists?name=${listName}&idBoard=${id}&key=${apiKey}&token=${apiToken}`
    );
    setLists([...lists, response.data]);
    setIsCreated(true);
  } catch (error) {
    showBoundary(error);
    console.log("Error: ", error);
  }
}

// for deleting/archive list ----
async function deleteList(listId) {
  try {
    const response = await axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${apiToken}&value=true`
    );
    setLists(lists.filter((list) => list.id !== listId));
    setIsClosed(true);
  } catch (error) {
    showBoundary(error);
    console.log("Error: ", error);
  }
}

const handleCloseAlert = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setIsCreated(false);
  setIsClosed(false);
};


  if(loader){
     return <Loader />
  }
  

  const { name, prefs } = board;

  return (
    <Box
      sx={{
        paddingTop:'1rem',
        backgroundColor:prefs?.backgroundColor,
        backgroundImage: `url(${prefs?.backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Stack direction="row" spacing={2} padding={2}>
       <Link to='/boards'>
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
        {lists.map((list) => (
          <List key={list.id} list={list} deleteList={deleteList}/>
        ))}
        
        {/* for adding new list  ------ */}
        <AddItem createItem={createList} itemName='a List' btnText='Add List'/>

        {/* for showing alert message on successfully creation of list ------- */}
        <AlertMessage
          isCompleted={isCreated}
          handleClose={handleCloseAlert}
          message={"SuccessFully List Created !"}
        />
        {/* for showing alert message on successfully deletion of list ------- */}
        <AlertMessage isCompleted={isClosed} handleClose={handleCloseAlert} message={'SuccessFully List Archived !'}/>
      </Stack>
    </Box>
  );
};

export default ListPage;
