import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from "./models/model";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {

  /* 
    declares a constant variable todo to hold the current state value, 
    initialized with an empty string "", and a function setTodo to update that state value. 
    The type annotation <string> ensures that todo can only hold values of the string type, 
    providing type safety when working with this state in your React component. 

    [todo, setTodo] 
    It is a desructuring assignment. It is used to extract values from array-like structure.
    in  this case, it extracs two values from the 'useState' hook
      - todo: represent the current state value
      - setTodo: it's a function used to update the state. 
    
    useState 
    This is a hook provide by React for managing state in functional components
    Here I specify that todo is expected to hold values of the 'string' type, with 
    initial state type of an empty string "".
   */
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      setTodos([...todos, {id:Date.now(), todo:todo, isDone: false}]);
      setTodo("");
    }
  };


  // logic to handle the drag and drop
  const onDragEnd = (result:DropResult) => {
    const { source, destination} = result;
    if(!destination) return;

    if(destination.droppableId === source.droppableId
      && destination.index === source.index) {
        return;
      } 

    let add;
    let active = todos;
    let complete = completedTodos;

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
    
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className = "heading">To-Do</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList 
          todos = {todos} 
          setTodos={setTodos} 
          CompletedTodos = {completedTodos}
          setCompletedTodos = {setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
