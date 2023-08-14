import React, { useRef, useState, useContext } from 'react';
import { todoContext } from '../../pages/AllTodos';
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

import './Todo.css';


export default function TodoItem(props) {

  const todo = props.todo;

  const { 
    removeTodoBtnRef, 
    editTodo, 
    removeTodo, 
    createChecklist, 
    useChecklist, 
    addTodoCardRef 
  } = useContext(todoContext);

  return (
    <div>
      <div className='todo-div' align='center'>
        <Card 
        className='todo-card' 
        ref={addTodoCardRef}
        >
          <div className='todo-item-container'>
            {!useChecklist ? <div>
                <div className='text-container'>
                  <div className='todo-title'>
                      <h1 style={{width: '18rem'}}>{todo.todoTitle}</h1>
                  </div>
                  <div className='todo-name'>
                      <p style={{width: '18rem'}}>{todo.todoName}</p>
                  </div>
                  </div>
                  <div className='button-container'>
                      <Button 
                      variant="outline-danger" 
                      onClick={() => removeTodo(todo.id, todo.todoName, todo.todoTitle, false)}
                      className='remove-btn'>Remove Todo</Button>
                      <Button 
                      variant="outline-info" 
                      onClick={() => editTodo(todo.id, todo.todoName, todo.todoTitle)}
                      className='remove-btn'>Edit Todo</Button>
                  </div>
                  {/* finish finish finish finish finish finish finish finish finish finish finish */}
                </div> : <div>
                  <div className='text-container'>
                  <div className='todo-title'>
                      <h1 style={{width: '18rem'}}>{todo.todoTitle}</h1>
                  </div>
                  <div className='todo-name'>
                      <p style={{width: '18rem'}}>{todo.todoName}</p>
                  </div>
                  </div>
                  <div className='button-container'>
                      <Button 
                      variant="outline-danger" 
                      onClick={() => removeTodo(todo.id, todo.todoName, todo.todoTitle, false)}
                      className='remove-btn'>Remove Todo</Button>
                      <Button 
                      variant="outline-info" 
                      onClick={() => editTodo(todo.id, todo.todoName, todo.todoTitle)}
                      className='remove-btn'>Edit Todo</Button>
                  </div>
                </div>}
              </div>
            </Card>
      </div>
    </div>
  )
}
// {todo.todoTitle && todo.todoName && todo.todoTitle.trim() === "" && todo.todoName.trim() === "" ? <Alert 
//                 style={{margin: '20px'}}
//                 variant="danger"
//                 ref={alertRef}
//                 dismissible>
//                   <Alert.Heading>Oh snap!</Alert.Heading>
//                     <p>
//                       You didn't add any text, please enter a title or some text to continue.
//                     </p>
//                     </Alert> :