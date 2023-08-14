import React, { useState, useRef, useEffect, createContext } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { BsListCheck } from 'react-icons/bs';

import './AllTodos.css';
import TodoModal from '../components/ui/Modal';
import TodoItem from '../components/todos/TodoItem';
import TodoForm from '../components/todos/TodoForm';
import TodoList from '../components/todos/TodoList';

export const todoContext = createContext();

export default function AllTodos() {
  const [newTodo, setNewTodo] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [disableBtn, setDisableBtn] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});
  const [useChecklist, setUseChecklist] = useState(false);
  const [clickChecker, setClickChecker] = useState(false);

  const todoInputRef = useRef();
  const addTodoCardRef = useRef();
  const addTodoBtnRef = useRef();
  const removeTodoBtnRef = useRef();

  const addTodo = () => {
    const todo = {
        todoTitle: newTodoTitle,
        todoName: newTodo,
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1
    }

    setTodoList([...todoList, todo]);

    // reset data
    setNewTodo("");
    setNewTodoTitle("");
    if (!todo.todoTitle.trim() === "" && !todo.todoName.trim() === "") {
      setIsClicked(false);
    }
  }

  const setClick = () => {
    setIsClicked(true);
  }

  const newTodoTitleSetter = (e) => {
    setNewTodoTitle(e.target.value);
  }

  const newTodoSetter = (e) => {
    setNewTodo(e.target.value);
  }

  const getTodo = (title, name, id) => {
    const todo = {
      todoTitle: title,
      todoName: name,
      id: id
    }

    setTodoList([...todoList, todo]);

    // reset data
    setIsClicked(false);
  }

  const removeTodo = (todoId, userTodoName, userTodoTitle, store) => {
    if (store) {
      setEditedTodo({
        editedTodoName: userTodoName, 
        editedTodoTitle: userTodoTitle, 
        editedTodoId: todoId
      })
    }

    const newTodoList = todoList.filter((todo) => {
        return todo.id !== todoId;
      })
    
    setTodoList(newTodoList);
  }

  // const todoCardClick = (todoId) => {
  //   if(!removeTodoBtnRef.current.contains) {}
  // }

  const editTodo = (todoId, userTodoName, userTodoTitle) => {
    removeTodo(todoId, userTodoName, userTodoTitle, true);
    setModalShow(true);
  }

  const handleCardClick = (e) => {
    // if (removeTodoBtnRef.current && todoCardRef.current) {
    //   if (
    //     !removeTodoBtnRef.current.contains(e.target) &&
    //     todoCardRef.current.contains(e.target)
    //   ) {
    //     todoCardClick();
    //   }
    // }
    if (!e.target || !addTodoCardRef.current) {
      return;
      setClickChecker(true);
    }
    // if (alertRef.current) {
    //   if (alertRef.current.contains(e.target)) {
    //     return;
    //   }
    // } 
    // if (!removeTodoBtnRef.current) {
    //   // Handle if refs are missing
    //   if (
    //     addTodoCardRef.current &&
    //     !addTodoCardRef.current.contains(e.target)
    //   ) {
    //     setIsClicked(false);
    //   }
    // } 
    if (removeTodoBtnRef.current && removeTodoBtnRef.current.contains(e.target)) {
        return;
        setClickChecker(true);
    }
    if (
      addTodoCardRef.current &&
      !addTodoCardRef.current.contains(e.target) &&
      clickChecker === false
      ) {
            setIsClicked(false);
    }
  }

  const onHide = () => {
    setModalShow(false);
  }

  useEffect(() => {
    if (isClicked) {
      todoInputRef.current.select()
    }
  }, [isClicked])

  useEffect(() => {
    document.addEventListener('mousedown', handleCardClick);
    return () => {
      document.removeEventListener('mousedown', handleCardClick);
    };
  }, []);

  return (
    <div className='App'>
      <div>
        <h1>Todo List</h1>
      </div>
      <div>
        <TodoForm 
        isClicked = {isClicked}
        setClick = {setClick}
        addTodoCardRef = {addTodoCardRef}
        todoInputRef = {todoInputRef}
        newTodoTitle = {newTodoTitle}
        newTodo = {newTodo}
        newTodoTitleSetter = {newTodoTitleSetter}
        newTodoSetter = {newTodoSetter}
        addTodo = {addTodo}
        addTodoBtnRef={addTodoBtnRef}
        />
      </div>
      <div>
        <todoContext.Provider value={{ 
          removeTodoBtnRef, 
          editTodo, 
          removeTodo,
          useChecklist,
          todoList,
          addTodoCardRef}}
          >
            <div ref={removeTodoBtnRef} className='todolist-outer-div'>
              <TodoList />
            </div>
        </todoContext.Provider>
        {/* {console.log(`app pass ins: title: ${editedTodo.editedTodoTitle} name: ${editedTodo.editedTodoName}`)} */}
        <TodoModal 
        show = {modalShow}
        modalTodoName = {editedTodo.editedTodoName}
        modalTodoTitle = {editedTodo.editedTodoTitle}
        modalTodoId = {editedTodo.editedTodoId}
        getTodo = {getTodo}
        onHide = {onHide}
        ref={removeTodoBtnRef}
        />
      </div>
    </div>
  )
}