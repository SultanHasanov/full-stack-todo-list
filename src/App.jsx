import { useEffect, useState } from "react";

import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import "./App.css";
// import uniqid from "uniqid";
import { useDispatch, useSelector } from "react-redux";
import {
  todosPost,
  todosFetch,
  todosDelete,
  todosPut,
  todosEdit,
} from "./features/todoSlice";

function App() {
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('')
  const [hint, setHint] = useState(false)

  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const isCompleted = todos.filter((item) => item.completed);
  const isActive = todos.filter((item) => !item.completed);

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

  const onClickEdit = (id, text) => {
    setEdit(id)
    setValue(text)
  }

  const todoSave = (id, value) => {
   dispatch(todosEdit({id, value}))
   setEdit(false)
  }

  

  return (
    <div className="App">
      <div className="form_body">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="static">
            <h4>Всего: {todos.length}</h4>
            <h4 style={{ color: "red" }}>Завершено: {isCompleted.length}</h4>
            <h4 style={{ color: "green" }}>Активные: {isActive.length}</h4>
          </div>
          <input
            className="inp"
            type="text"
            placeholder="Введите задачу"
            value={text.length < 10 ? text : text.substring(0, 20)}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn_addtodo" onClick={addTodo}>
            Add todo
          </button>
          <span onClick={() => setHint(!hint)}>💡</span>
          {hint && (
            <span onClick={() => setHint(false)}>Не больше 10 символов</span>
          )}
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
                {edit === item.id ? (
                  <div>
                    <input
                      className="inp_edit"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                    />
                    <button
                      className="btn_save"
                      onClick={() => todoSave(item.id, value)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="content">
                    {/* <span>{item.date}</span> */}
                    <span className={item.completed ? "active" : ""}>
                      {item.text}
                    </span>
                  </div>
                )}
                {!edit &&
                <>
                <BsPencilFill
                  className="pen"
                  onClick={() => onClickEdit(item.id, item.text)}
                />
                <MdDelete className="btn" onClick={() => todoRemove(item.id)} />
                </> }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
