import React from 'react';
import Error404Svg from './Error404svg';
// import AppRoutes from '../../constants/routes';
import './Error404.css';

const Error404: React.FC = () => {
  // const navigate = useNavigate();
  return (
    <>
      <div className="error404">
        <Error404Svg />
        <div className="message-box">
          <h1>404</h1>
          <p>Page not found</p>
          {/* <button onClick={() => navigate(AppRoutes.ABOUT)}> */}
        </div>
      </div>
    </>
  );
};

export default Error404;
