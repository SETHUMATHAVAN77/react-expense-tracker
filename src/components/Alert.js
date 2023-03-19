import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Alert = ({ type, msg, showAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      showAlert({
        type: "",
        msg: "",
      });
    }, 2500);

    return () => clearTimeout(timeOut);
  });

  return (
    <>
      <div className={`alert alert-${type}`}>
        <div className="fa-check">
          <FaCheckCircle />
        </div>
        <small>{msg}</small>
      </div>
    </>
  );
};

export default Alert;
