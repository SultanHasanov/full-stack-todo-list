import { createContext, useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { todosFetch } from "./features/todoSlice";
import Form from "./components/Form";
import Button from "./UI/Button";
import Footer from "./components/Footer";
import Todos from "./components/Todos";

export const StateContext = createContext();

function App() {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [hint, setHint] = useState(false);
  const [text, setText] = useState("");
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
  };

  useEffect(() => {
    dispatch(todosFetch());
  }, [dispatch]);

  return (
    <div className="App">
      <StateContext.Provider value={stateObj}>
        <div className="form_body">
          <Form />
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
  );
}

export default App;
