import React from 'react';

const Button = () => {
    const downloadsTodo = () => {
      fetch("https://63642ce67b209ece0f42316d.mockapi.io/todos")
        .then((res) => res.blob())
        .then((data) => {
          console.log(data);
          let url = URL.createObjectURL(data);
          let anchor = document.createElement("a");
          anchor.href = url;
          anchor.download = "document.txt";
          document.body.append(anchor);
          anchor.style = "display: none";
          anchor.click();
          anchor.remove();
          URL.revokeObjectUrl(url);
        });
    };
    return (
      <>
        <button
          onClick={downloadsTodo}
          style={{
            padding: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Download
        </button>
      </>
    );
};

export default Button;