import { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { Stack, IconButton, Typography, Dialog } from "@mui/material";
import AddItem from "../common/AddItem";
import AlertMessage from "../common/AlertMessage";
import CheckListWindow from "../CheckList/CheckListWindow";
import { useErrorBoundary } from "react-error-boundary";
import DeleteIcon from "@mui/icons-material/Delete";

import {fetchCards,createNewCard,deleteCard} from '../../app/features/card/cardSlice';


const index = ({ listId }) => {

  const [isCreated, setIsCreated] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [open, setOpen] = useState(false);

  const { showBoundary } = useErrorBoundary();

  const  {cards,error} = useSelector((state)=>state.card);
  const dispatch=useDispatch();


  useEffect(() => {
  //  get all Cards -------
     dispatch(fetchCards(listId));
  }, []);

 
  // create cards-------------
  async function createCard(cardTitle) {
    dispatch(createNewCard({listId,cardTitle}));
    setIsCreated(true);
  }

  // for deleting card -------------
  async function deleteSelectedCard(cardId) {
    dispatch(deleteCard({listId,cardId}));
    setIsClosed(true);
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

  if(error){
    showBoundary(error);
  }

  return (
    <>
      <Stack
        sx={{ maxHeight: "50vh", overflowY: "auto", cursor: "pointer" }}
        spacing={2}
        className="cards-container"
      >
        { cards[listId]?.map((card) => (
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
              onClick={() => deleteSelectedCard(card.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

           
           {/* for checklist ---------- */}
         
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <CheckListWindow
            cardId={card.id}
            cardName={cards[listId].find((cardElm) => cardElm.id === card.id)?.name}
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
