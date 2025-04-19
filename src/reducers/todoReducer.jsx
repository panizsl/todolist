export const initialState = [];
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          complete: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) => {
        return todo.id === action.payload
          ? { ...todo, completed: !todo.complete }
          : todo;
      });
    case "DELETE_TODO":
      return state.filter((todo) => todo.id != action.payload);

    default:
      return state;
  }
};

export default todoReducer;
