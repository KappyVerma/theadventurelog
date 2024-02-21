import "./CreateTodo.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import GetTodo from "../GetTodo/GetTodo";

export default function Todo({ url, bucketId }) {
  const [todoItems, setTodoItems] = useState([]);

  const getTodos = async () => {
    const response = await axios.get(`${url}/bucketlist/${bucketId}/todo`);
    setTodoItems(response.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const newTodo = async (e) => {
    e.preventDefault();
    if (!e.target.todo.value) {
      e.target.todo.style.border = "1px solid #d22d2d";
      return;
    }
    const todoItem = {
      todoitem: e.target.todo.value,
      bucketlist_id: bucketId,
    };

    await axios.post(`${url}/todo`, todoItem);
    getTodos();
    e.target.todo.value = "";
  };

  return (
    <>
      <section className="toDo">
        <form onSubmit={newTodo} className="toDo__form">
          <input
            autoComplete="off"
            type="text"
            className="toDo__input"
            name="todo"
            placeholder="What needs to be done?"
          />
        </form>
      </section>
      <GetTodo todoItems={todoItems} url={url} />
    </>
  );
}
