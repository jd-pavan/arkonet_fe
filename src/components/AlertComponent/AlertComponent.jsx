import React, { useState, useEffect } from 'react';
import './AlertComponent.css'

const AlertComponent = ({ ResponseStatus, ResponseMessage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (ResponseMessage !== "null") {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      return () => clearTimeout(timeout); // Clear timeout on unmount
    }
  }, [ResponseMessage]);

  const handleClose = () => {
    setIsVisible(false);
  };
  const AlertBoxStyle = {
    position: "absolute",
    top: "39x",
    right: "35px",
    width: "70%"
  }
  return (
    <div style={AlertBoxStyle} >
      <div className={`alert ${isVisible ? 'visible' : 'notvisible'}  alert-info`} role="alert" >
        <button type="button" className="close" onClick={handleClose} style={{ fontSize: "29px" }}>
          <span aria-hidden="true">&times;</span>
        </button>
        <strong >{ResponseStatus}</strong>{ResponseMessage}
      </div>
    </div>
  );
};

export default AlertComponent;


