import { Link } from 'react-router-dom';
import FormAnswers from '../../components/FormAnswers/FormAnswers';

const MainPage = () => {
  return (
    <>
      <Link to="/uncontrolled">
        <h2>Uncontrolled Form</h2>
      </Link>
      <Link to="/react-hook-form">
        <h2>React Hook Form</h2>
      </Link>
      <FormAnswers />
    </>
  );
};

export default MainPage;
