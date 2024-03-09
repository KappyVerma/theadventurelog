import "./GetTodo.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GetTodo({ todoItems, url }) {
  const [todoItemsToRender, setTodoItemsToRender] = useState(todoItems);

  const handleChange = async (event, itemId) => {
    const isChecked = event.target.checked;

    try {
      const response = await axios.patch(`${url}/todo/${itemId}`, {
        status: isChecked,
      });
      setTodoItemsToRender(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete(`${url}/todo/${itemId}`);
      setTodoItemsToRender(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setTodoItemsToRender(todoItems);
  }, [todoItems]);

  const sortedTodoItems = todoItemsToRender.sort((a, b) => {
    return a.status - b.status;
  });

  return (
    <ul className="todos">
      {sortedTodoItems?.map((item) => (
        <li key={item.id} className="todos__list">
          <span
            className="todos__item"
            style={{
              textDecoration: item.status === 1 ? "line-through" : "none",
            }}
          >
            {item.todoitem}
          </span>
          <Checkbox
            className="todos__checkbox"
            checked={item.status}
            onChange={(event) => handleChange(event, item.id)}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 18 },
              padding: "0",
              marginRight: "3px",
            }}
          />
          <IconButton
            aria-label="delete"
            size="small"
            sx={{ fontSize: "1rem", padding: "0" }}
            onClick={() => handleDelete(item.id)}
          >
            <DeleteIcon
              className="todos__delete"
              sx={{
                fontSize: "18px",
              }}
            />
          </IconButton>
        </li>
      ))}
      {!sortedTodoItems.length && (
        <p className="todos__dir">*enter/return to submit the todo item*</p>
      )}
    </ul>
  );
}
