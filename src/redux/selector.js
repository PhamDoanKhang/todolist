import { createSelector } from "@reduxjs/toolkit"
import TodoList from "../component/todos"
export const searchTextSelector = (state)=>state.filters.search
export const todoListSelector = (state)=>state.todoList
export const statusFilterSelector = (state)=>state.filters.status
export const sortFilterSelector = (state) => state.filters.sort

export const todosRemainingSelector = createSelector(todoListSelector,sortFilterSelector ,statusFilterSelector,searchTextSelector,(todoList, sort,status,searchText)=>{
    if(status === "all"){
        const newTodoList = todoList.filter((todo)=>{
            return todo.value.includes(searchText)
        })
        if(sort === "ascend"){
            return newTodoList.sort(function(a,b){
                if(a.value < b.value){
                    return -1
                }else{
                    return 1
                }
            })
        }else{
            return newTodoList.sort(function(a,b){
                if(a.value > b.value){
                    return -1
                }else{
                    return 1
                }
            })
        }
    }else if(status === "done"){
        const newTodoList = todoList.filter((todo)=>{
            return todo.isDone === false && todo.value.includes(searchText)
        })
        if(sort === "ascend"){
            return newTodoList.sort(function(a,b){
                if(a.value < b.value){
                    return -1
                }else{
                    return 1
                }
            })
        }else{
            return newTodoList.sort(function(a,b){
                if(a.value > b.value){
                    return -1
                }else{
                    return 1
                }
            })
        }
       
    }else{
        const newTodoList = todoList.filter((todo)=>{
            return todo.isDone === true && todo.value.includes(searchText)
        })
        if(sort === "ascend"){
            return newTodoList.sort(function(a,b){
                if(a.value < b.value){
                    return -1
                }else{
                    return 1
                }
            })
        }else{
            return newTodoList.sort(function(a,b){
                if(a.value > b.value){
                    return -1
                }else{
                    return 1
                }
            })
        }
    }
})

