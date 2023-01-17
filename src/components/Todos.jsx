import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todosDelete, todosEdit, todosPut } from '../features/todoSlice';
import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { StateContext } from '../App';

const Todos = () => {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

const { edit, value, setEdit, setValue } = useContext(StateContext);

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

    const todoRemove = (id) => {
      dispatch(todosDelete(id));
    };

    return (
      <>
        {todos?.map((item, index) => {
          return (
            <div className="task" key={item.id}>
              <div className="inp_index">
                <b>{index + 1})</b>

                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheck(item.id, item.completed)}
                />
              </div>
              {edit === item.id ? (
                <div>
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
                <div className="content">
                  <span className="date">
                    <p>{item.date}</p>
                    <p>{item.dateTime}</p>
                  </span>
                  <span
                    style={{ width: "100%", marginLeft: "15px" }}
                    className={item.completed ? "active" : ""}
                  >
                    {item.text}
                  </span>
                </div>
              )}
              {!edit && (
                <>
                  <BsPencilFill
                    className="pen"
                    onClick={() => onClickEdit(item.id, item.text)}
                  />
                  <MdDelete
                    className="btn"
                    onClick={() => todoRemove(item.id)}
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