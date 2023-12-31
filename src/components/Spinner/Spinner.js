// Spinner.js
import React from 'react';
import style from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={`${style.loader_container}`}>
      <div className={`${style.loader}`}></div>
    </div>
  );
};

export default Spinner;
