import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import uniqid from "uniqid";

export const todosFetch = createAsyncThunk("todos/todosFetch", async () => {
  const { data } = await axios.get(
    "https://63642ce67b209ece0f42316d.mockapi.io/todos?sortBy=completed&order=asc"
  );
  return data;
});

export const todosPost = createAsyncThunk("todos/post", async (text) => {
  const { data } = await axios.post(
    "https://63642ce67b209ece0f42316d.mockapi.io/todos",
    {
      id: uniqid(),
      text,
      completed: false,
      date: new Date().toLocaleDateString(),
      dateTime: new Date().toLocaleTimeString()
    }
  );

  return data;
});

export const todosDelete = createAsyncThunk("todos/delete", async (id) => {
  const { data } = await axios.delete(
    `https://63642ce67b209ece0f42316d.mockapi.io/todos/${id}`
  );
  return data.id;
});




export const todosPut = createAsyncThunk(
  "todos/put",
  async ({ completed, id }) => {
    const { data } = await axios.put(
      `https://63642ce67b209ece0f42316d.mockapi.io/todos/${id}`,
      {
        completed: !completed,
      }
    );
    return data.id;
  }
);

export const todosEdit = createAsyncThunk(
  "todos/edit",
  async ({id, text, value }) => {
    const { data } = await axios.put(
      `https://63642ce67b209ece0f42316d.mockapi.io/todos/${id}`,
      {
        text: value,
      }
    );
    return data;
  }
);

const initialState = {
  todos: [],
  
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [todosPost.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
      // state.loading = false;
    },
    [todosFetch.fulfilled]: (state, action) => {
      state.todos = action.payload;
    },
    [todosDelete.fulfilled]: (state, action) => {
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    },

    [todosEdit.fulfilled]: (state, action) => {
      state.todos = state.todos.map((obj) => {
        if(obj.id === action.payload.id) {
          obj.text = action.payload.text
        }
        return obj
      });
      console.log(action.payload)
    },

    [todosPut.fulfilled]: (state, action) => {
      state.todos = state.todos.map((el) => {
        if (el.id === action.payload) {
          el.completed = !el.completed;
        }
        return el;
      });
    },
  },
});

export const { addTodos } = todosSlice.actions;
export default todosSlice.reducer;
