import React from 'react';
import Error404Svg from './Error404svg';
import { useNavigate } from 'react-router-dom';
import './Error404.css';

const Error404: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="error404">
        <Error404Svg />
        <div className="message-box">
          <h1>404</h1>
          <p>Page not found</p>
          <button onClick={() => navigate('/')}>To main page</button>
        </div>
      </div>
    </>
  );
};

export default Error404;
