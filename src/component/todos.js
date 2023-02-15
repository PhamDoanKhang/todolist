import {  useState } from 'react';
import { List, Select } from 'antd';
import './TodoList.css';
import { useDispatch, useSelector } from 'react-redux';
import { todosRemainingSelector } from '../redux/selector';
import { ToastContainer } from 'react-toastify';
import { ErrorNotification } from './toast/toast';
const { Option } = Select;
import TodoSlice from '../Slice/TodoSlice';
import FilterSlice from '../Slice/FilterSlice';
const TodoList = () => {
    const dispatch = useDispatch()
    const [display,setDisplay] = useState({
        show: false,
        isThatShow : ""
    })
    const [getValue,setGetValues] = useState("");
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [sortOrder, setSortOrder] = useState('ascend'); // ascend, Descend
    const [selectedFilter, setSelectedFilter] = useState('all'); // all, done, undone
    // get todolist in stort
    const todoList = useSelector(todosRemainingSelector)
    // Handel Add Todo
    const handleAddTodo = () => {
       if(inputValue == ""){
        ErrorNotification("Todo data is Empty");
       }else{
            const addObj = { id: Date.now(), value: inputValue, isDone: true }
            if(localStorage.getItem('value')){
                    const arr = JSON.parse(localStorage.getItem('value'))
                    
                    const newArr = arr.filter((todo,index)=>{
                        return todo.value.toLowerCase() == inputValue.toLowerCase()
                    })
                    // console.log(newArr)
                    if(newArr.length > 0){
                        ErrorNotification('Duplicate todoList data')
                    }else{
                        arr.push(addObj)
                            localStorage.setItem('value',JSON.stringify(arr))
                            dispatch(
                                TodoSlice.actions.addTodo(addObj)
                            )
                            setInputValue("")   
                    }
                }else{
                    localStorage.setItem('value',JSON.stringify([addObj]))
                    dispatch(
                        TodoSlice.actions.addTodo(addObj)
                    )
                    setInputValue("")
                }
       }
    };
    // Handel Search todolist
    const HandelSearchChange = (e)=>{
        setSearchValue(e.target.value)
        dispatch(FilterSlice.actions.searchFilterChange(e.target.value))
    }
    // Handel sort todolist
    const HandelSortChange = (e)=>{
        setSortOrder(e.target.value)
        dispatch(FilterSlice.actions.sortFilterChange(e.target.value))
    }
    // Handel delete todoList
    const handleDeleteTodo = (id) => {
        const delTodo = JSON.parse(localStorage.getItem('value'))
        const newArr = delTodo.filter((todo)=>{
            return todo.id !== id
        })
        localStorage.setItem('value', JSON.stringify(newArr) )
        dispatch(TodoSlice.actions.deleteTodoList(index))
    };
    // Hadel status todoList
    const handleMarkDone = (todo) => {
        const markDone = JSON.parse(localStorage.getItem('value'))
        const filterDone = markDone.map((todo1,i)=> todo1.id == todo.id ? { ...todo1, isDone: !todo1.isDone } : todo1 ) 
        localStorage.setItem('value',JSON.stringify(filterDone));
        dispatch(TodoSlice.actions.toggleTodoStatus(todo.id))
    };

    // Handel markdone todolist
    const HandelSelectedFilter = (e)=>{
        setSelectedFilter(e.target.value);
        dispatch(FilterSlice.actions.statusFilterChange(e.target.value))
    }
    // Dispay from edit
    const HandelEditTodo = (todo)=>{
        setDisplay({
            show: !display.show,
            isThatShow : todo.id
        })
        setGetValues(todo.value)
    }
    // Confirm edit todoItems
    const HandelEditDeploy = (id)=>{
        const arrEdit = JSON.parse(localStorage.getItem('value'))
        const listEdit = arrEdit.map((todo,i)=> todo.id == id ? { ...todo,value: getValue } : todo)
        localStorage.setItem('value',JSON.stringify(listEdit))
        dispatch(TodoSlice.actions.editTodoList({
            idList: id,
            value: getValue
        }))
        setDisplay({
            ...display,
            show: !display.show
        })
    }
    return (
        <div className="todo">
            <ToastContainer  />
            <div className="todo-list">
                <div className="todo-list-header">
                    <div className='todo-list-add'>
                        <input
                            placeholder="Enter your a todo"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onPressEnter={handleAddTodo}
                            className="todo-list-input"
                        />
                        <label className='todo-list-title'>Add a todo</label>
                    </div>
                    <div className="todo-list-btn">
                        <button onClick={handleAddTodo} className="todo-list-button">
                            Add
                        </button>
                    </div>
                    <div className="todo-list-add todo-list-seach">
                        <input
                            placeholder="Search"
                            value={searchValue}
                            onChange={e=>{HandelSearchChange(e)}}
                            className="todo-list-search todo-list-input"
                        />
                        <label className="todo-list-title">Search</label>
                    </div>
                    <div className="todo-list-select">
                        <select
                            value={sortOrder}
                            onChange={(e)=>HandelSortChange(e)}
                            className="todo-list-sort"
                        >
                            <option value="ascend">Ascend</option>
                            <option value="descend">Descend</option>
                        </select>
                    </div>
                    <div className="todo-list-select">
                        <select
                            defaultValue="all"
                            value={selectedFilter}
                            onChange={(e)=>HandelSelectedFilter(e)}
                            className="todo-list-filter"
                        >
                            <option value="all">All</option>
                            <option value="done">Done</option>
                            <option value="undone">Undone</option>
                        </select>
                    </div>
                </div>
                <List
                    className="todo-list-items"
                    dataSource={todoList}
                    renderItem={(todo, index) => (
                        <List.Item 
                            key={todo.id}
                            className={`todo-item ${todo.isDone ? 'todo-item-done' : ''}`}
                            actions={[
                                <input 
                                    value={getValue} 
                                    className={display.show && display.isThatShow == todo.id  ? "inputEdit" : "hiddenIn"} 
                                    onChange={(e)=>{setGetValues(e.target.value)}}
                                />,
                                <div
                                    onClick={()=>{HandelEditTodo(todo);}}
                                    className={`${display.show == true && display.isThatShow == todo.id ? "hiddenIn" : "todo-item-icon" }`}
                                >EDIT</div>,
                                <div
                                    onClick={()=>{HandelEditDeploy(todo.id);}}
                                    className={display.show && display.isThatShow == todo.id  ? "todo-item-icon" : "hiddenIn"}
                                >SAVE</div>,
                                <div
                                    onClick={() => handleMarkDone(todo,index)}
                                    className="todo-item-icon"
                                >{todo.isDone ? 'DONE': "UNDONE" }</div>,
                                <div
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    className="todo-item-icon"
                                >DELETE</div>,
                            ]}
                        >
                            {todo.value}
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default TodoList;