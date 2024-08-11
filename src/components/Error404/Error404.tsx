import React from 'react';
import Error404Svg from './Error404svg';
// import './Error404.css';

const Error404: React.FC = () => {
  return (
    <>
      <div className="error404" role="error404">
        <Error404Svg />
        <div className="message__box">
          <h1>404</h1>
          <p>Page not found</p>
        </div>
      </div>
    </>
  );
};

export default Error404;
