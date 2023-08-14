import React, { useEffect } from 'react';
import './Todo.css';

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

export default function TodoForm(props) {
  const isClicked = props.isClicked;
  const addTodoCardRef = props.addTodoCardRef;
  const newTodoTitle = props.newTodoTitle;
  const newTodoTitleSetter = props.newTodoTitleSetter;
  const setClick = props.setClick;
  const todoInputRef = props.todoInputRef;
  const newTodo = props.newTodo;
  const newTodoSetter = props.newTodoSetter;
  const addTodo = props.addTodo;
  const addTodoBtnRef = props.addTodoBtnRef;

  const handleTitleKeyDown = (e) => {
    if (e.key==='Enter') {
        
    }
  }

  const createChecklist = () => {
    console.log('checklist!');
  }

  return (
    <div>
    {
        isClicked === true ? 
        <div align='center' className='isClickedForm'>
            <Card className='add-todo-form-card' ref={addTodoCardRef}>
                <div>
                <Row>
                <Form.Label></Form.Label>
                <Col>
                    <Form.Floating className="mb-3">
                    <Form.Control 
                    as="textarea"
                    style={{border: 0}}
                    className='title-input'
                    size="lg" 
                    type="text" 
                    value={newTodoTitle}
                    placeholder="Title" 
                    id='title'
                    onKeyDown={handleTitleKeyDown}
                    onChange={newTodoTitleSetter} />
                    <label htmlFor="title">Title</label>
                    </Form.Floating>
                </Col>
                </Row>
                </div>
                <br />
                <Row>
                <Form.Label></Form.Label>
                <Col>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Floating className="mb-3">
                        <Form.Control
                        as="textarea"
                        rows={20}
                        style={{border: 0}} 
                        type="text" 
                        placeholder="Add a todo..." 
                        value={newTodo}
                        ref={todoInputRef}
                        id="add-a-todo"
                        onChange={newTodoSetter} />
                        <label htmlFor="add-a-todo">Add a todo...</label>
                    </Form.Floating>
                    </Form.Group>
                </Col>
                </Row>
                <div>
                {!newTodo && !newTodoTitle || newTodo.trim() === "" && newTodoTitle.trim() === "" ? <div>
                    <p align='left' style={{color: 'black'}}>👋Title or todo text is required</p>
                    <Button 
                    variant="outline-success" 
                    onClick={addTodo}
                    ref={addTodoBtnRef} 
                    className='addTodo'
                    disabled
                    >Add Todo</Button>
                    </div> : <div>
                    <Button 
                    variant="outline-success" 
                    onClick={addTodo}
                    ref={addTodoBtnRef} 
                    className='addTodo'
                    >Add Todo</Button>
                    </div>}
                </div>
                </Card>
                </div> : <div align='center' onClick={setClick}>
            <Row className='home-todo-input'>
                <Form.Label></Form.Label>
                <Col>
                <Form.Control 
                type="text" 
                placeholder="Enter a todo pweazee" 
                className='home-placeholder-input'
                />
                </Col>
            </Row>
        </div>
    }     
    </div>
  )
}