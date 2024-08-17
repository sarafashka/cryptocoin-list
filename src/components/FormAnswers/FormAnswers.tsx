import { useAppSelector } from '../../hooks/reduxTypedHooks';

const FormAnswers = () => {
  const answers = useAppSelector((state) => state.formAnswers);
  return (
    <>
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
                <div className="answer__password">1111</div>
                <div className="answer__accept">{item.terms}</div>
                <div className="answer__picture">{item.picture}</div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default FormAnswers;
