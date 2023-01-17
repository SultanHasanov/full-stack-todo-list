import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { StateContext } from '../App';
import { todosPost } from '../features/todoSlice';
import Static from './Static'

const Form = () => {
    const {text, hint, setText, setHint} = useContext(StateContext);

    const dispatch = useDispatch()

    const addTodo = () => {
    if (
      text
        .split("")
        .filter((item) => item !== " ")
        .join("")
    ) {
      dispatch(todosPost(text));
    }
    setText("");
  };

    return (
      <>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="static">
            <Static />
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
          <span style={{ cursor: "pointer" }} onClick={() => setHint(!hint)}>
            💡
          </span>
          {hint && (
            <span
              style={{ cursor: "pointer" }}
              className="span_text"
              onClick={() => setHint(false)}
            >
              Не больше 20 символов
            </span>
          )}
        </form>
      </>
    );
};

export default Form;