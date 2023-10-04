import React, { useState, useRef, useEffect} from 'react'
import { Todo } from "../models/model"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  index: number
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);


    // Call setTodos to update the state variable 'todos'
    // The 'map' function is used to create a new array by iterating over each element of the 'todos' array
        // For each 'todo' in the 'todos' array, a ternary operator '===' check if the id of the current 'todo'\
        // matches the 'id' passed to the 'handleDone' function.
        // If the id 'matches', it means we want to toggle the 'isDone' property of this specific 'todo'.
        // If the id does not match, leave the 'todo' object unchanged

        /*
          '{...todo }': 
            This  part of the expression uses the spread operator ('...') to create a shallow copy of the 'todo' object.
          'isDone: !todo.isDone': 
            a new property 'isDone' is added to the copied object. The value of this property is computed based
          on the current value of 'todo.isDone'. It toggles the value of 'isDone' by using the logical NOT operator ('!'). 
        */ 

  const handleEdit = (e:React.FormEvent, id: number) => {
    // prevent screen from refreshing 
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === id?
        {...todo, todo:editTodo} : todo
      )
    )
    setEdit(false);
  };

  
  const handleDone = (id: number) => {  
    setTodos(
      todos.map((todo) =>
        todo.id === id ? 
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


  // move the cursor to the editing area automatically when editing
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  },[edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot)=>(
        <form 
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} 
          onSubmit={(e) => handleEdit(e,todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/*cross out the completed todo item*/}
          {
            edit? (
              <input 
                ref = {inputRef}
                value={editTodo} 
                onChange={(e) => setEditTodo(e.target.value)}
                className='todos__single--text'
              />
            ) : todo.isDone? (
              <s className='todos__single--text'>{todo.todo}</s>
            ) : (
              <span className="todos__single--text">{todo.todo}</span>
            )
          }

          {/* display the todo item icons */}
          <div>
            <span 
              className="icon" 
              onClick={() => {
                if(!edit && !todo.isDone) {
                  setEdit(!edit)
                }
              }}>
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
      )}

  
    
    </Draggable>


  )
}

export default SingleTodo;
