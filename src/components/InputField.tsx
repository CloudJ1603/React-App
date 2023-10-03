import React from 'react';
import "./style.css";

interface Props {
  todo:string;
  setTodo:React.Dispatch<React.SetStateAction<string>>;
}

const InputField:React.FC<Props> = ({todo, setTodo}: Props) => {
  return (
    <form className = "input">
        <input 
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
