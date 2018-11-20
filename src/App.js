import React, { Component } from "react";
import "./App.css";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
class App extends Component {
  constructor() {
    super();

    this.state = {
      message: "ToDo App",
      newTodo: "",
      todos: []
    };
  }

  /*Functions create a new 'this'. 
  So "THIS" inside constructor and "this.setState" inside a function are not the same.
  There are 3 methods to bind:
  1. (Best way) Fat arrow function: onChange={event => this.newTodoChanged(event)}
  2. bind(this) on event: onSubmit={this.formSubmitted.bind(this)}
  3. bind(this) in constructor: this.formSubmitted = this.formSubmitted.bind(this)}*/

  newTodoChanged(event) {
    this.setState({
      newTodo: event.target.value
    });
  }

  /* There is 2 option to update state with an array.
   1. Push method 
   2. ... (...this.state.todo)
  formSubmitted(event) {
    event.preventDefault();
    const todos = this.state.todos.slice();
    todos.push({
      title: this.state.newTodo,
      done: false
    });
    this.setState({
      todos
    });
    console.log(this.state.todos);
  }
  */

  formSubmitted(event) {
    event.preventDefault();
    if (this.state.newTodo === "") {
      return;
    }
    /*this.setState({
      todos: [
        ...this.state.todos,
        {
          title: event.target.elements[0].value,
          done: false
        }
      ]
    });
    event.target.elements[0].value = "";*/
    this.setState({
      //why newTodo: "", clears the input?
      newTodo: "", //clear out the input form
      todos: [
        //updating todos to be a new array
        ...this.state.todos, //with all of the existing values in todos (creates copy of the existing array)
        {
          //and updating that array with a new object
          title: this.state.newTodo,
          done: false
        }
      ]
    });
  }

  toggleTodoDone(event, index) {
    //how index know that it is an array index?
    const todos = [...this.state.todos]; //creates copy of the array
    todos[index] = {
      ...todos[index], //the spread will take all of the existing properties add them to the object and then after that's done if there was already a done property
      done: event.target.checked //it's gonna be overwritten with this value of "event.target.checked"

      /* Another way to do line 67-68
    todos[index] = { ...todos[index] }; //creates a copy of that specific todo item at that index inside of that array
    todos[index].done = event.target.checked; // and then updates done property at that index to be marked as true*/
    };

    this.setState({
      todos
    });
  }

  removeTodo(index) {
    //how index know that it is an array index?
    const todos = [...this.state.todos]; //copy the array
    todos.splice(index, 1); //splice modifies that array. After we've made the copy we pull out that specific index and then update state to be this new array that's missing that one todo at that index
    this.setState({
      todos
    });
  }

  markAll() {
    //will map over todos to create a new array and then for every to do inside of that array we're gonna create a new todo with all of its properties but DONE is going to be true
    const todos = this.state.todos.map(todo => {
      return {
        title: todo.title,
        done: true
      };
    });
    this.setState({
      todos
    });
  }

  render() {
    return (
      <div className="App">
        <h3>{this.state.message}</h3>
        <h1>{window.test}</h1>
        <NewTodoForm
          newTodo={this.state.newTodo}
          formSubmitted={this.formSubmitted.bind(this)}
          newTodoChanged={this.newTodoChanged.bind(this)}
        />
        <button onClick={() => this.markAll()}>Mark all as done</button>
        <TodoList
          todos={this.state.todos}
          toggleTodoDone={this.toggleTodoDone.bind(this)}
          removeTodo={this.removeTodo.bind(this)}
        />
      </div>
    );
  }
}

export default App;
