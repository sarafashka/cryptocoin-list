import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <>
      <Link to="/uncontrolled">
        <h2>Uncontrolled Form</h2>
      </Link>
      <Link to="/react-hook-form">
        <h2>React Hook Form</h2>
      </Link>
    </>
  );
}

export default MainPage;
