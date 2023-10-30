import { useState, useEffect } from "react";
import axios from "axios";
import { Stack, IconButton, Typography, Dialog } from "@mui/material";
import AddItem from "../common/AddItem";
import AlertMessage from "../common/AlertMessage";
import CheckListWindow from "../CheckList/CheckListWindow";
import { useErrorBoundary } from "react-error-boundary";
import DeleteIcon from "@mui/icons-material/Delete";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

const index = ({ listId }) => {
  const [cards, setCards] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [open, setOpen] = useState(false);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    getAllCards();
  }, []);

  //  get all Cards -------
  async function getAllCards() {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/lists/${listId}/cards/?key=${apiKey}&token=${apiToken}`
      );
      setCards(response.data);
    } catch (error) {
      showBoundary(error);
      console.log("Error: ", error);
    }
  }

  // create cards-------------
  async function createCard(cardTitle) {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${apiToken}&name=${cardTitle}`
      );
      setCards([...cards, response.data]);
      setIsCreated(true);
    } catch (error) {
      showBoundary(error);
      console.log("Error: ", error);
    }
  }

  // for deleting card -------------
  async function deleteCard(cardId) {
    try {
      await axios.delete(
        `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}`
      );
      setCards(cards.filter((card) => card.id !== cardId));
      setIsClosed(true);
    } catch (error) {
      showBoundary(error);
      console.log("Error: ", error);
    }
  }

 
  function handleClose() {
    setOpen(false);
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsCreated(false);
    setIsClosed(false);
  };

  return (
    <>
      <Stack
        sx={{ maxHeight: "50vh", overflowY: "auto", cursor: "pointer" }}
        spacing={2}
        className="cards-container"
      >
        {cards.map((card) => (
          <Stack
            key={card.id}
            className="card"
            id={card.id}
            direction="row"
            spacing={2}
            padding={2}
            borderRadius={1}
            boxShadow={2}
            sx={{
              border: "1px solid grey",
              justifyContent: "space-between",
              backgroundColor: "white",
            }}
          >
            <Typography
              sx={{ flexGrow: 1 }}
              onClick={() => setOpen(true)}
            >
              {card.name}
            </Typography>
            <IconButton
              aria-label="card-delete-btn"
              className="card-delete-btn"
              onClick={() => deleteCard(card.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

           
           {/* for checklist ---------- */}
         
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <CheckListWindow
            cardId={card.id}
            cardName={cards.find((cardElm) => cardElm.id === card.id)?.name}
            handleClose={handleClose}
          />
        </Dialog>
  
          </Stack>
        ))}
      </Stack>

      {/* for showing add card popup ------- */}
      <AddItem createItem={createCard} itemName="a Card" btnText="Add Card" />

      

      {/* for showing alert message on successfully creation of Card ------- */}
      <AlertMessage
        isCompleted={isCreated}
        handleClose={handleCloseAlert}
        message={"SuccessFully Card Created !"}
      />

      {/* for showing alert message on successfully deletion of card ------- */}
      <AlertMessage
        isCompleted={isClosed}
        handleClose={handleCloseAlert}
        message={"SuccessFully Card archived !"}
      />
    </>
  );
};

export default index;
