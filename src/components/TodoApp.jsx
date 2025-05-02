import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
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

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

const init = () => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : initialState;
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState, init);
  const [text, setText] = useState("");

  const remainingCount = useMemo(() => {
    return state.filter((t) => !t.completed).length;
  }, [state]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const handleAdd = useCallback(() => {
    if (text.trim() === "") return;
    dispatch({ type: "ADD_TODO", payload: text });
    setText("");
  }, [text, dispatch]);

  const handleToggle = useCallback(
    (id) => {
      dispatch({ type: "TOGGLE_TODO", payload: id });
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch({ type: "DELETE_TODO", payload: id });
    },
    [dispatch]
  );

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>
      <Paper
        elevation={4}
        style={{
          padding: "30px",
          borderRadius: "16px",
          backgroundColor: "#ffffffcc",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontStyle={"italic"}
        >
          Todo List{" "}
          <img
            src="/icons/completed-task.png"
            alt="todo icon"
            style={{ width: 32, marginRight: 8 }}
          />
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          style={{ fontFamily: "serif" }}
          gutterBottom
          fontStyle={"italic"}
        >
          Tasks left: {remainingCount}
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
          fontStyle={"italic"}
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
                  onClick={() => handleToggle(todo.id)}
                  edge="end"
                  color="primary"
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(todo.id)}
                  edge="end"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Paper>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TodoApp;
