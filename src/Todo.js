import React from "react";
import TodoItem from "./TodoItem";
import "./styles.css";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.inputValue = "";
    this.state = {
      todoItems: this.props.todos,
      buttonValue: ""
    };
  }

  render() {
    const todoItems = this.filterItems(this.state.todoItems);
    const activeTasksLength = this.state.todoItems.filter(
      todo => todo.isChecked === false
    ).length;
   
    return (
      <div className="main-container">
        <div className="input-container">
          <h1>Todo</h1>
          <input
            className="text-input"
            type="text"
            ref={element => (this.inputValue = element)}
            onKeyPress={event => this.handleKeyPress(event)}
          />
          <button className="btn" onClick={() => this.addItem(this.inputValue)}>
            Add
          </button>
          <span>
            remaining: <span className="numbers">{activeTasksLength}</span> of
            <span className="numbers"> {this.state.todoItems.length}</span>
          </span>
        </div>
        <ul>
          {todoItems.map(item => {
            return (
              <TodoItem
                value={item.value}
                key={item.value}
                onClick={this.removeItem.bind(this)}
                isChecked={item.isChecked}
                onClick2={this.isChecked.bind(this)}
              >
                {item.text}
              </TodoItem>
            );
          })}
        </ul>
        <div>
          <button onClick={() => this.setButtonValue("All")} className="btn">
            All
          </button>
          <button className="btn" onClick={() => this.setButtonValue("Done")}>
            Done
          </button>
          <button className="btn" onClick={() => this.setButtonValue("Active")}>
            Active
          </button>
        </div>
      </div>
    );
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.addItem(this.inputValue);
    }
  }

  setButtonValue(value) {
    this.setState(prevState => {
      return {
        ...prevState,
        buttonValue: value
      };
    });
  }

  filterItems(items) {
    let foundndItems;

    switch (this.state.buttonValue) {
      case "Active":
        foundndItems = items.filter(item => item.isChecked === false);
        break;
      case "Done":
        foundndItems = items.filter(item => item.isChecked === true);
        break;
      default:
        foundndItems = items;
    }
    return foundndItems;
  }

  isChecked(value) {
    let newTodos = [...this.state.todoItems];

    newTodos.forEach(todo => {
      if (todo.value === value) {
        todo.isChecked = !todo.isChecked;
      }
    });

    this.setState(prevState => {
      return {
        ...prevState,
        todoItems: newTodos
      };
    });
  }

  removeItem(value) {
    const newTodos = this.state.todoItems.filter(todo => todo.value !== value);

    this.setState(prevState => {
      return { ...prevState, todoItems: newTodos };
    });
  }

  addItem(input) {
    if (input.value === "") {
      return;
    }

    const maxValue =
      this.state.todoItems.length > 0
        ? Math.max(...this.state.todoItems.map(item => item.value))
        : 0;

    const newTodos = [
      ...this.state.todoItems,
      { value: maxValue + 1, text: input.value, isChecked: false }
    ];

    input.value = "";
    this.setState(prevState => {
      return { buttonValue: prevState.buttonValue, todoItems: newTodos };
    });
  }
}

export default Todo;
