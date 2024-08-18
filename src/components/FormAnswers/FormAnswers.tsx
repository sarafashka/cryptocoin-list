import { useAppSelector } from '../../hooks/reduxTypedHooks';
import './formAnswers.css';

const FormAnswers = () => {
  const answers = useAppSelector((state) => state.formAnswers);
  return (
    <>
      <div className="wrapper">
        {answers.length > 0 &&
          answers.map((item, index) => {
            return (
              <>
                <div key={index} className="answer">
                  <div className="answer__name">{item.name}</div>
                  <div className="answer__age">{item.age}</div>
                  <div className="answer__email">{item.email}</div>
                  <div className="answer__gender">{item.gender}</div>
                  <div className="answer__country">{item.country}</div>
                  <div className="answer__password">{item.password}</div>
                  <div className="answer__accept">{String(item.terms)}</div>
                  <div className="answer__picture">
                    <img src={item.picture} alt="picture" width={100} />
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default FormAnswers;
