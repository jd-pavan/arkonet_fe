// SubAuth.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionAuth = (props) => {
  const navigate = useNavigate();

  useEffect(() => {

    if (!localStorage.length > 0) {
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

export default SubscriptionAuth;

