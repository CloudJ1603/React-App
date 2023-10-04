import React, { useRef } from 'react';
import "./style.css";

interface Props {
  todo:string;
  setTodo:React.Dispatch<React.SetStateAction<string>>;
  handleAdd:(e: React.FormEvent) => void;
}
/*
  define a React Functional conponent named 'InputField' that expects props of type 'Props'.
  It ddestructures the 'todo', 'setTodo' and 'handleAdd' props from 'Props' object, allowing 
  use them within the component's logic. 
*/ 
const InputField:React.FC<Props> = ({todo, setTodo, handleAdd}: Props) => {
  
  // 
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <form className = "input" onSubmit={(e) => {
      handleAdd(e);
      /* 
        After calling 'handleAdd', the code accesses the 'current' property of the 'inputRef' object.
        The blur() method is calledd on the input element referenced by 'inputRef', to remove focus 
        from the input element
      */
      inputRef.current?.blur();
    }}>
        <input 
          ref = {inputRef}
          type = "input" 
          value={todo}
          /* when the input value changed, the function is executed
          and update the 'todo' state with new value provided by 'e.target.value'*/
          onChange={(e) => setTodo(e.target.value)}
          placeholder = "Enter a task" 
          className = "input__box" 
        />
        <button className = "input_submit" type = "submit">
            Go
        </button>
    </form>
  )
}

export default InputField
