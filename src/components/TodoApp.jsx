import React, { useEffect, useReducer, useState } from "react";
import todoReducer, { initialState } from "../reducers/todoReducer";

import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

// 👇 اینا رو اضافه کن:
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

// تعریف تابع initializer دقیقاً بالای کامپوننت
const init = () => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : initialState;
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState, init);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch({ type: "ADD_TODO", payload: text });
    setText("");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Todo List 📝
      </Typography>
      <TextField
        color="secondary"
        label="New Task"
        fullWidth
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        onClick={handleAdd}
        variant="contained"
        color="secondary"
        fullWidth
        style={{ marginTop: "10px" }}
      >
        Add todo
      </Button>
      <List>
        {state.map((todo) => (
          <Paper
            key={todo.id}
            elevation={3}
            style={{
              padding: "10px",
              margin: "10px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              // رنگ پس‌زمینه آیدل:
              backgroundColor: todo.completed ? "#e0e0e0" : "#f3e5f5",

              // حالت هاور:
              "&:hover": {
                backgroundColor: todo.completed ? "#e0e0e0" : "#ce93d8",
              },

              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                fontFamily: "'Vazirmatn', sans-serif",
                fontSize: "16px",
              }}
            >
              {todo.text}
            </span>
            <div>
              <IconButton
                onClick={() =>
                  dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                }
                edge="end"
                color="primary"
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  dispatch({ type: "DELETE_TODO", payload: todo.id })
                }
                edge="end"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Paper>
        ))}
      </List>
    </Container>
  );
};

export default TodoApp;
