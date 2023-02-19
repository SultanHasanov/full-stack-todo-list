import { createContext, useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { todosFetch } from "./features/todoSlice";
import Form from "./components/Form";
import Button from "./UI/Button";
import Footer from "./components/Footer";
import Todos from "./components/Todos";
// import NameTodos from "./components/NameTodos";

export const StateContext = createContext();

function App() {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [hint, setHint] = useState(false);
  const [text, setText] = useState("");
  const [disText, setDisText] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const stateObj = {
    edit,
    value,
    hint,
    text,
    setHint,
    setText,
    setEdit,
    setValue,
    disText,
    setDisText,
    count,
    setCount,
  };

  useEffect(() => {
    dispatch(todosFetch());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="App_2">
        <StateContext.Provider value={stateObj}>
          <div style={{ width: "100%" }}>
            <Form />
          </div>
          {/* <NameTodos /> */}
          
          <div className="form_body">
            <div className="content_body">
              <Todos />
            </div>
          </div>
          <div className="footer">
            <Footer />
          </div>
          <Button />
        </StateContext.Provider>
      </div>
    </div>
  );
}

export default App;
