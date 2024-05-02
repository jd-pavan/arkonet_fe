// Protected.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.length < 2 && 
    const LocalstorageValue = localStorage.getItem('LogedIn');
    if (!LocalstorageValue) {
      navigate('/admin/');
    }
  }, [navigate]);

  const Cmp = props.Cmp;

  return (
    <>
      <Cmp />
    </>
  );
}

export default Protected;
