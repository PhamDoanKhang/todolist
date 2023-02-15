const initState = {
    filters:{
        seach: "",
        sort: "",
    },
    todoList:[
        { id:1 , value: "Learn HTML/CSS", isDone: true },
        { id:2 , value: "Learn Javacript", isDone: true },
        { id:3 , value: "Learn React", isDone: false },
    ]
}

const rootReducer = (state = initState , action)=>{
    console.log({state,action})
    switch(action.type){
        case 'todoList/addTodo':
            return {
                ...state,
                todoList: [
                    ...state.todoList,
                    action.payload
                ]
            }
        
        default:
            return state;
    }
}

export default rootReducer