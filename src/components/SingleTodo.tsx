import React, { useState } from 'react'
import { Todo } from "../models/model"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {

  

  const handleDone = (id: number) => {
    // Call setTodos to update the state variable 'todos'
    setTodos(
      // The 'map' function is used to create a new array by iterating over each element of the 'todos' array
      todos.map((todo) =>
        // For each 'todo' in the 'todos' array, a ternary operator '===' check if the id of the current 'todo'\
        // matches the 'id' passed to the 'handleDone' function.
        todo.id === id ? 
        // If the id 'matches', it means we want to toggle the 'isDone' property of this specific 'todo'.
        // If the id does not match, leave the 'todo' object unchanged

        /*
          '{...todo }': 
            This  part of the expression uses the spread operator ('...') to create a shallow copy of the 'todo' object.
          'isDone: !todo.isDone': 
            a new property 'isDone' is added to the copied object. The value of this property is computed based
          on the current value of 'todo.isDone'. It toggles the value of 'isDone' by using the logical NOT operator ('!'). 
        */
        { ...todo, isDone: !todo.isDone } : todo
      
      )
    );
  };

  const handleDelete = (id: number) => {
    // filter out the todo item matching the given id in parameter
    setTodos(
      todos.filter(
        (todo) => todo.id!==id
      )
    )
  };


  return (
    <form className="todos__single">
      {
        todo.isDone? (
          <s className='todos__single'>{todo.todo}</s>
        ) : (
          <span className="todos__single--text">{todo.todo}</span>
        )
      }

  
      

      {/* display the todo item icons */}
      <div>
        <span className="icon">
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  )
}

export default SingleTodo
