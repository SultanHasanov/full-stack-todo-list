import React from "react";

const Footer = () => {
  return (
    <>
      <button onClick={() => window.location.reload()} className="update">
        Обновить страницу
      </button>
      <span style={{ marginLeft: "10px", marginTop: "10px", color: "green" }}>
        Нажмите на кнопку обновить, чтобы отсортировать завершенные задачи
      </span>
    </>
  );
};

export default Footer;
