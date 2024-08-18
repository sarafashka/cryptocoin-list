import React, { useRef, useState } from 'react';
import './forms.css';
import { FormInputs } from '../../store/slices/types';
import { schema } from './schemaValidation';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { addFormAnswers } from '../../store/slices/formAnswersSlice';
import { ValidationError } from 'yup';

type Errors = Partial<Record<keyof FormInputs, string>>;

const UncontrolledForm: React.FC = () => {
  const navigate = useNavigate();
  const countries = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<Errors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: FormInputs = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value || '',
      gender: maleRef.current?.checked ? 'male' : 'female',
      picture: pictureRef.current?.value || '',
      country: countryRef.current?.value || '',
      terms: termsRef.current?.checked || false,
    };

    schema
      .validate(formData, { abortEarly: false })
      .then((validatedData) => {
        setErrors({});
        dispatch(addFormAnswers(validatedData));
        navigate('/');
      })
      .catch((validationErrors: ValidationError) => {
        const errorMessages: Errors = {};
        validationErrors.inner.forEach((error) => {
          const path = error.path as keyof FormInputs;
          if (path) {
            errorMessages[path] = error.message;
          }
        });
        setErrors(errorMessages);
      });
  };

  return (
    <>
      <h2>Uncontrolled Form</h2>
      <form className="form" onSubmit={onSubmit}>
        <div className="form__field">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input ref={nameRef} id="name" className="form__input" />
          {errors.name && <p className="form__error">{errors.name}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="age" className="form__label">
            Age
          </label>
          <input ref={ageRef} id="age" className="form__input" />
          {errors.age && <p className="form__error">{errors.age}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input ref={emailRef} id="email" className="form__input" />
          {errors.email && <p className="form__error">{errors.email}</p>}
        </div>

        <div className="form__radio">
          <label htmlFor="male">
            <div>
              <input
                ref={maleRef}
                id="male"
                type="radio"
                value="male"
                name="gender"
              />
              male
            </div>
          </label>
          <label htmlFor="female">
            <div>
              <input
                ref={femaleRef}
                id="female"
                type="radio"
                value="female"
                name="gender"
              />
              female
            </div>
          </label>
          {errors.gender && <p className="form__error">{errors.gender}</p>}
        </div>

        <div className="input-field">
          <label>Picture</label>
          <input ref={pictureRef} />
          {errors.picture && <p className="form__error">{errors.picture}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="country" className="form__label">
            Country
          </label>
          <select
            ref={countryRef}
            className="form__input form__select"
            id="country"
          >
            {countries.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.country && <p className="form__error">{errors.country}</p>}
        </div>

        <div className="form__checkbox">
          <input ref={termsRef} id="terms" type="checkbox" />
          <label htmlFor="terms">I accept Terms and Conditions</label>
          {errors.terms && <p className="form__error">{errors.terms}</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

export default UncontrolledForm;
