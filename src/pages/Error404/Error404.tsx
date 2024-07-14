import React from 'react';
import Error404Svg from './Error404svg';
import AppRoutes from '../../constants/routes';
import './Error404.css';
import { useNavigate } from 'react-router-dom';

const Error404: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="error404" role="error404">
        <Error404Svg />
        <div className="message__box">
          <h1>404</h1>
          <p>Page not found</p>
          <button
            role="button"
            className="message__button"
            onClick={() => navigate(AppRoutes.HOME)}
          >
            Go to the main page
          </button>
        </div>
      </div>
    </>
  );
};

export default Error404;
