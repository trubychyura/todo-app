import React from "react";

const TodoItem = props => {
  const { isChecked, value, onClick, onClick2 } = props;
  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={isChecked ? "checked" : ""}
          onClick={() => onClick2(value) }
        />
        <span style ={{textDecoration:isChecked ? 'line-through': '' }} >{props.children}</span>
        <button 
          className="delete-btn"
          onClick={() => onClick(value)}
        >X</button>
      </li>
    </>
  );
};

export default TodoItem;
