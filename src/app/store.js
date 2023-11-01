import {configureStore} from '@reduxjs/toolkit';
import boardReducer from './features/board/boardSlice';
import listReducer from './features/list/listSlice';
import cardReducer from './features/card/cardSlice';
import checkListReducer from './features/checkList/checkListSlice';
import checkItemReducer from './features/checkItem/checkItemSlice';

const store=configureStore({
    reducer:{
    board:boardReducer,
    list:listReducer,
    card:cardReducer,
    checkList:checkListReducer,
    checkItem:checkItemReducer,
    }
})

export default store;