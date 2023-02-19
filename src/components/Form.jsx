import React, { useContext } from 'react';
import { useDispatch} from 'react-redux';
import { StateContext } from '../App';
import { todosPost } from '../features/todoSlice';
// import Static from './Static'

const Form = () => {
    const {text, hint, setText, setHint, disText, setDisText} = useContext(StateContext);
    
    const dispatch = useDispatch()

    const addTodo = () => {
    if (text
        .split("")
        .filter((item) => item !== " ")
        .join("")) {
      dispatch(todosPost(text));
    }
    setText("");
    setDisText(false)
  };

    return (
      <>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* <div className="static">
            <Static />
          </div> */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              className="inp"
              type="text"
              placeholder="Введите задачу..."
              value={text.length < 10 ? text : text.substring(0, 70)}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn_addtodo" onClick={addTodo}>
              Добавить
            </button>
          </div>
          {disText ? (
            <span style={{ color: "red" }}>
              Удаляются только завершенные дела !
            </span>
          ) : (
            <span
              title="Подсказка"
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "17px",
                margin: '5px'
              }}
              onClick={() => setHint(!hint)}
            >
              💡
            </span>
          )}
          {hint && (
            <span
              style={{ cursor: "pointer" }}
              className="span_text"
              onClick={() => setHint(false)}
            >
              Не больше 40 символов
            </span>
          )}
        </form>
      </>
    );
};

export default Form;