import { useEffect, useState } from "react";
import "./App.css";
// import uniqid from "uniqid";
import { useDispatch, useSelector } from "react-redux";
import {
  todosPost,
  todosFetch,
  todosDelete,
  todosPut,
  
} from "./features/todoSlice";

function App() {
  const [text, setText] = useState("");

  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todosFetch());
  }, [dispatch]);

  const addTodo = () => {
    if (text !== "") {
      dispatch(todosPost(text));
    }
    setText("");
  };

  const todoRemove = (id) => {
    dispatch(todosDelete(id));
  };
  

  const handleCheck = (id, completed) => {
    dispatch(todosPut({ id, completed }));
  };

  return (
    <div className="App">
      <div className="form_body">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* {new Date().toLocaleDateString()} */}
          <h3>Список задач: {todos.length}</h3>
          <input
            type="text"
            placeholder="Введите задачу"
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
          <button onClick={addTodo}>Add todo</button>
        </form>
        <div>
          {todos?.map((item, index) => {
            return (
              <div className="task" key={item.id}>
                <b>{index + 1})</b>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheck(item.id, item.completed)}
                />

                <span className={item.completed ? "active" : ""}>
                  {item.text}
                </span>

                <button className="btn" onClick={() => todoRemove(item.id)}>X</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
