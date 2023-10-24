import { useState, useEffect } from "react";
import axios from "axios";
import { Stack, IconButton, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddItem from "../common/AddItem";
import AlertMessage from "../common/AlertMessage";
import DeleteItem from "../common/DeleteItem";
import CheckListWindow from "../CheckList/CheckListWindow";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

//  get all Cards -------
async function getAllCards(listId, setCards) {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/lists/${listId}/cards/?key=${apiKey}&token=${apiToken}`
    );
    //  console.log(response.data);
    setCards(response.data);
  } catch (error) {
    console.log("Error: ", error);
  }
}

// create cards-------------
async function createCard(
  listId,
  cards,
  setCards,
  cardTitle,
  setCardTitle,
  setIsCreated
) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${apiToken}&name=${cardTitle}`
    );
    // console.log('Created card: ',response.data);
    setCards([...cards, response.data]);
    setCardTitle("");
    setIsCreated(true);
  } catch (error) {
    console.log("Error: ", error);
  }
}

// for deleting card -------------
async function deleteCard(cardId, cards, setCards, setIsClosed, setCardId) {
  try {
    await axios.delete(
      `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}`
    );
    setCards(cards.filter((card) => card.id !== cardId));
    setIsClosed(true);
    setCardId("");
  } catch (error) {
    console.log("Error: ", error);
  }
}

const index = ({ listId }) => {
  const [cards, setCards] = useState([]);
  const [cardTitle, setCardTitle] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [cardId, setCardId] = useState("");
  const [openChecklistDialog, setOpenChecklistDialog] = useState(false);

  useEffect(() => {
    getAllCards(listId, setCards);
  }, []);

  if (cardTitle) {
    createCard(listId, cards, setCards, cardTitle, setCardTitle, setIsCreated);
  }

  if (cardId && isClosed) {
    deleteCard(cardId, cards, setCards, setIsClosed, setCardId);
  }

  function handleClick(e) {
    const cardId = e.target.closest(".card").id;
    if (e.target.closest(".card-delete-btn")) {
      setCardId(cardId);
      setOpenDeleteDialog(true);
    } else if (e.target.closest(".card")) {
      // console.log(e.target.closest('.card'));
      setCardId(cardId);
      setOpenChecklistDialog(true);
    }
  }
  return (
    <>
      <Stack
        sx={{ maxHeight: "50vh", overflowY: "auto", cursor: "pointer" }}
        spacing={2}
        className="cards-container"
        onClick={(e) => handleClick(e)}
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
            <Typography>{card.name}</Typography>
            <IconButton
              aria-label="card-delete-btn"
              className="card-delete-btn"
            >
              <EditOutlinedIcon />
            </IconButton>
          </Stack>
        ))}
      </Stack>

      {/* for showing add card popup ------- */}
      <AddItem
        setItemTitle={setCardTitle}
        itemName="a Card"
        btnText="Add Card"
      />

      {/* for showing delete card popup -------- */}
      <DeleteItem
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        setIsClosed={setIsClosed}
        itemName="Card"
      />

      {/* for checklist ---------- */}
      {cardId && (
        <CheckListWindow
          open={openChecklistDialog}
          setOpen={setOpenChecklistDialog}
          cardId={cardId}
        />
      )}

      {/* for showing alert message on successfully creation of Card ------- */}
      <AlertMessage
        isCompleted={isCreated}
        setIsCompleted={setIsCreated}
        message={"SuccessFully Card Created !"}
      />

      {/* for showing alert message on successfully deletion of card ------- */}
      <AlertMessage
        isCompleted={isClosed}
        setIsCompleted={setIsClosed}
        message={"SuccessFully Card archived !"}
      />
    </>
  );
};

export default index;
