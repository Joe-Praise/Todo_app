import React, { useRef } from "react";

const Input = (props) => {
  const inputRef = useRef();

  const inputHandler = (e) => {
    e.preventDefault();
    const taskValue = inputRef.current.value
    if(taskValue.trim() === ""){
      return
    }
    const inputValue = {
      id: Math.random().toString(),
      task: inputRef.current.value,
      checked: false
    };
    props.onCreateTodo(inputValue);
    inputRef.current.value = "";
  };
  return (
    <form>
      <span className='checkmarkDisable'></span>
      <input type="text" placeholder="Create a new todo..." ref={inputRef} />
      <button onClick={inputHandler}>Create</button>
    </form>
  );
};

export default Input;
