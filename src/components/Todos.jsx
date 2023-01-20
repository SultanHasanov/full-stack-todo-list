import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todosDelete, todosEdit, todosPut } from "../features/todoSlice";
import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { StateContext } from "../App";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const [disabled, setDisabled] = useState(true)
  
  const dispatch = useDispatch();

  const { edit, value, setEdit, setValue, disText, setDisText } = useContext(StateContext);

  const handleCheck = (id, completed) => {
    dispatch(todosPut({ id, completed }));
  };

  const todoSave = (id, value) => {
    dispatch(todosEdit({ id, value }));
    setEdit(false);
  };

  const onClickEdit = (id, text) => {
    setEdit(id);
    setValue(text);
  };

  const todoRemove = (id, completed) => {
    if(completed){
      dispatch(todosDelete(id));
    }
    setDisabled(true)
    if(!completed && disabled){
      setDisText(!disText)
    }
    console.log(disText)
  };

  return (
    <>
      {todos?.map((item, index) => {
        return (
          <div key={item.id} className="task">
            <div className="inp_index">
              <b>{index + 1})</b>
              <input
                title="Завершить задачу"
                type="checkbox"
                checked={item.completed}
                onChange={() => handleCheck(item.id, item.completed)}
              />
            </div>
            {edit === item.id ? (
              <div key={item.id}>
                <input
                  maxLength="20"
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
              <div key={item.id} className="content">
                <span className="date">
                  <p>{item.date}</p>
                  <p>{item.dateTime}</p>
                </span>
                <span
                  style={{ width: "100%", marginLeft: "15px"}}
                  className={item.completed ? "active" : ""}
                >
                  {item.text}
                </span>
              </div>
            )}
            {!edit && (
              <>
                <BsPencilFill
                  title="Редактировать"
                  className="pen"
                  onClick={() => onClickEdit(item.id, item.text)}
                />

                <MdDelete
                
                  disabled={disabled}
                  title="Удалить"
                  className="btn"
                  onClick={() => todoRemove(item.id, item.completed)}
                />
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Todos;
