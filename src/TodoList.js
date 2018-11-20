import React from "react";
import ListItem from "./ListItem";

const TodoList = props => {
  return (
    <ul>
      {props.todos.map((todo, index) => {
        return (
          <ListItem
            key={index}
            index={index}
            todo={todo}
            toggleTodoDone={props.toggleTodoDone}
            removeTodo={props.removeTodo}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
