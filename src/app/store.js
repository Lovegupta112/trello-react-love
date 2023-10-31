import {configureStore} from '@reduxjs/toolkit';
import boardReducer from './features/board/boardSlice';
import listReducer from './features/list/listSlice';

const store=configureStore({
    reducer:{
    board:boardReducer,
    list:listReducer,
    }
})

export default store;