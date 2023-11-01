import {configureStore} from '@reduxjs/toolkit';
import boardReducer from './features/board/boardSlice';
import listReducer from './features/list/listSlice';
import cardReducer from './features/card/cardSlice';


const store=configureStore({
    reducer:{
    board:boardReducer,
    list:listReducer,
    card:cardReducer,
    }
})

export default store;