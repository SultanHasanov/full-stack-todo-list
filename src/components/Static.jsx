import React from "react";
import { useSelector } from "react-redux";

const Static = () => {
  const todos = useSelector((state) => state.todos);
  const isCompleted = todos.filter((item) => item.completed);
  const isActive = todos.filter((item) => !item.completed);
  return (
    <>
      <h4>Всего: {todos.length}</h4>
      <h4 style={{ color: "red" }}>Завершено: {isCompleted.length}</h4>
      <h4 style={{ color: "green" }}>Активные: {isActive.length}</h4>
    </>
  );
};

export default Static;
