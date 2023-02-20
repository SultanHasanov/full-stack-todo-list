import React from "react";

const Footer = () => {
  return (
    <>
      <button onClick={() => window.location.reload()} className="update">
        Обновить страницу
      </button>
      <span style={{ marginLeft: "10px", marginTop: "10px", color: "green" }}>
        Вы можете скачать список задач
      </span>
    </>
  );
};

export default Footer;
