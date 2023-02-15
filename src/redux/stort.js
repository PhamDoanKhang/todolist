// import { createStore } from 'redux'

// import rootReducer from "./reducer"; 
// import { composeWithDevTools } from "redux-devtools-extension"

// const stort = createStore(rootReducer, composeWithDevTools);

// export default stort

import FilterSlice from "../Slice/FilterSlice"
import TodoSlice from "../Slice/TodoSlice"
import { configureStore } from "@reduxjs/toolkit"
const stort = configureStore({
    reducer:{
        filters: FilterSlice.reducer,
        todoList: TodoSlice.reducer,
    }
})
export default stort
