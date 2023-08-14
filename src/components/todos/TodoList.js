import React, { useContext } from 'react';
import { todoContext } from '../../pages/AllTodos';
import TodoItem from './TodoItem';
import './Todo.css';

export default function TodoList() {
  const { todoList,  removeTodoBtnRef } = useContext(todoContext);

  return (
    <div>
      <p ref={removeTodoBtnRef} align='center' className='todo-list'>{todoList.map(todo => {
            return (
                <div align='center' className='card-output'>
                  <TodoItem todo={todo} />
                </div>
            )
          })}</p>
    </div>
  )
}
