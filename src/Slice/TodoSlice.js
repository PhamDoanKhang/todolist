// const initState = [
//     { id:1 , value: "Aearn HTML/CSS", isDone: true },
//     { id:2 , value: "Xearn Javacript", isDone: true },
//     { id:3 , value: "Zearn React", isDone: true },
//     { id:4 , value: "DDDDDD React", isDone: false },
// ]
// const todoListReducer = (state = initState , action)=>{
//     switch(action.type){
//         case 'todoList/addTodo':
//             return [...state,action.payload];
//         case "todoList/toggleTodoStatus":
//             return state.map((todo)=> todo.id == action.payload ? {...todo, isDone: !todo.isDone} : todo)
//         case "todoList/deleteTodoChange":
//             return /* Xoa chua  */
//         default:
//             return state;
//     }
// }

// export default todoListReducer

import { createSlice  } from "@reduxjs/toolkit"
const value = JSON.parse(localStorage.getItem('value'))
export default createSlice({
    name: "todoList",
    initialState:  value ? value : []
        // [
        //     { id:2 , value: "Xearn Javacript", isDone: true },
        //     { id:3 , value: "Zearn React", isDone: true },
        //     { id:4 , value: "DDDDDD React", isDone: false },
        // ]
    ,
    reducers:{
        // Thao tac truc tiep len state
        addTodo: (state,action)=>{
            state.push(action.payload)
        },
        toggleTodoStatus: (state,action)=>{
            return state.map(todo => todo.id == action.payload ? {...todo, isDone: !todo.isDone}: todo)
        },
        editTodoList: (state,action)=>{
            return state.map(todo => todo.id == action.payload.idList ? { ...todo, value:action.payload.value } : todo)
        },
        deleteTodoList: (state,action)=>{
            state.splice(action.payload,1)
        },
    }

})