import React, { useRef, useState } from 'react';
import './forms.css';
import { FormInputs } from '../../store/slices/types';
import { schema } from './schemaValidation';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { addFormAnswers } from '../../store/slices/formAnswersSlice';
import { ValidationError } from 'yup';
import { checkPassword } from '../../utils/checkPasswordStrength';

type Errors = Partial<Record<keyof FormInputs, string>>;

const UncontrolledForm: React.FC = () => {
  const navigate = useNavigate();
  const countries = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<Errors>({});
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: FormInputs = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value || '',
      gender: maleRef.current?.checked ? 'male' : 'female',
      picture: image || '',
      country: countryRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
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

  const handlePasswordChange = () => {
    const password = passwordRef.current?.value || '';
    const strength = checkPassword(password);
    setPasswordStrength(strength.trim());
  };

  const handlePictureChange = () => {
    const file = pictureRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
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

        <div className="form__field">
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            ref={passwordRef}
            id="password"
            className="form__input"
            type="password"
            onChange={handlePasswordChange}
          />
          {errors.password && <p className="form__error">{errors.password}</p>}
          <p className="input__note">Strength: {passwordStrength}</p>
        </div>

        <div className="form__field">
          <label htmlFor="confirmPassword" className="form__label">
            Confirm Password
          </label>
          <input
            ref={confirmPasswordRef}
            id="confirmPassword"
            className="form__input"
            type="password"
          />
          {errors.confirmPassword && (
            <p className="form__error">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="input-field">
          <label htmlFor="picture" className="form__label">
            Picture
          </label>
          <input
            ref={pictureRef}
            id="picture"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handlePictureChange}
          />
          {errors.picture && <p className="form__error">{errors.picture}</p>}
          {image && <p className="input__note">Picture saved</p>}
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
