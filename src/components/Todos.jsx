import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todosDelete, todosEdit, todosPut } from "../features/todoSlice";
import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { StateContext } from "../App";

const Todos = () => {
  const todos = useSelector((state) => state.todos);

  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();

  const {
    count,
    setCount,
    edit,
    value,
    setEdit,
    setValue,
    disText,
    setDisText,
  } = useContext(StateContext);

  const handleCheck = (id, completed) => {
    dispatch(todosPut({ id, completed }));
    setDisText(false);

    if (!completed) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  };

  const todoSave = (id, value) => {
    dispatch(todosEdit({ id, value}));
    setEdit(false);
  };

  const onClickEdit = (id, text) => {
    setEdit(id);
    setValue(text);
    setDisText(false);
  };
  const todoRemove = (item, id, completed) => {
    if (completed) {
      dispatch(todosDelete(id));
    }
    setDisabled(true);
    if (!completed && disabled) {
      setDisText(!disText);
    }
  };

  return (
    <>
      {todos?.map((item) => {
        return (
          <div key={item.id} className="task">
            <div className={item.completed ? "active" : "task_2"}>
              {edit === item.id ? (
                <div className="task_edit" key={item.id}>
                  <textarea
                    maxLength="150"
                    className="inp_edit"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  ></textarea>
                  <button
                    className="btn_save"
                    onClick={() => todoSave(item.id, value)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div key={item.id} className="content">
                  <div className="task_text">
                    <span style={{ marginRight: "7px" }}>
                      <BsPencilFill
                        title="Редактировать"
                        className="pen"
                        onClick={() => onClickEdit(item.id, item.text)}
                      />
                    </span>
                    <span>{item.text}</span>
                  </div>
                  <MdDelete
                    disabled={disabled}
                    title="Удалить"
                    className="btn"
                    onClick={() => todoRemove(item, item.id, item.completed)}
                  />
                </div>
              )}
              {item.completed && <div className="close_body"><div className="close_task"></div></div>}

              <div className="task_date">
                <div>
                  <span>
                    <b>Создан:</b>
                  </span>
                  <p>{item.date}</p>
                  <p>{item.dateTime}</p>
                </div>
                <div className="task_main">
                  <input
                    title="Завершить задачу"
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCheck(item.id, item.completed)}
                    style={{ accentColor: "green" }}
                  />
                </div>
                <div>
                  <span>
                    <b>Изменен:</b>
                  </span>
                  <p>{new Date().toLocaleDateString()}</p>
                  <p>{new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Todos;
