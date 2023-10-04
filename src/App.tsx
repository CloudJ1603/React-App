import React, { useState } from 'react';

import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from "./models/model";

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

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      
      setTodos([...todos, {id:Date.now(), todo:todo, isDone: false}])
      setTodo("");
    }
  };

  console.log(todos);

  return (
    <div className="App">
      <span className = "heading">To-Do</span>

      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos = {todos} setTodos={setTodos} />

    </div>

  );
};

export default App;
