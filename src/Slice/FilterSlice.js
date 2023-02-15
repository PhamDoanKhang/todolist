// const initState = {
//     search: "",
//     sort: "ascend",
//     status: "all",
// }
// const filterReducer = (state = initState , action)=>{
//     switch(action.type){
//         case 'filtes/searchFilterChange':
//             return {
//                 ...state,
//                 search: action.payload
//             }
//         case 'filtes/statusFilterChange':
//             return {
//                 ...state,
//                 status : action.payload}
//         case 'filter/sortFilterChange':
//             return {
//                 ...state,
//                 sort: action.payload
//             }
//         default:
//             return state;
//     }
// }

// export default filterReducer

import { createSlice } from "@reduxjs/toolkit"
export default createSlice({
    name: "filters",
    initialState: {
        search: "",
        sort: "ascend",
        status: "all",
    },
    reducers:{
        searchFilterChange: (state,action)=>{
            state.search = action.payload
        },
        statusFilterChange: (state,action)=>{
            state.status = action.payload
        },
        sortFilterChange: (state,action)=>{
            state.sort = action.payload  
        },
    }
})