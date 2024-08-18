import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './forms.css';
import { FormInputs } from '../../store/slices/types';
import { schema } from './schemaValidation';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { addFormAnswers } from '../../store/slices/formAnswersSlice';

const ReactHookForm: React.FC = () => {
  const navigate = useNavigate();
  const countries = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();

  const [image, setImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormInputs) => {
    console.log('data', data);
    if (image) {
      dispatch(addFormAnswers({ ...data, picture: image }));
      navigate('/');
    }
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input {...register('name')} id="name" className="form__input" />
          {errors.name && <p className="form__error">{errors.name.message}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="age" className="form__label">
            Age
          </label>
          <input id="age" className="form__input" {...register('age')} />
          {errors.age && <p className="form__error">{errors.age.message}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input id="email" className="form__input" {...register('email')} />
          {errors.email && (
            <p className="form__error">{errors.email.message}</p>
          )}
        </div>

        <div className="form__radio">
          <label htmlFor="male">
            <div>
              <input
                id="male"
                type="radio"
                value="male"
                {...register('gender')}
              />
              male
            </div>
          </label>
          <label htmlFor="female">
            <div>
              <input
                id="female"
                type="radio"
                value="female"
                {...register('gender')}
              />
              female
            </div>
          </label>
          {errors.gender && (
            <p className="form__error">{errors.gender.message}</p>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="country" className="form__label">
            Country
          </label>
          <select
            {...register('country')}
            className="form__input form__select"
            id="country"
          >
            {countries.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          {errors.country && (
            <p className="form__error">{errors.country.message}</p>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form__input"
            {...register('password')}
          />
          {errors.password && (
            <p className="form__error">{errors.password.message}</p>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="confirmPassword" className="form__label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="form__input"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="form__error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="input-field">
          <label className="form__label" htmlFor="picture">
            Picture
          </label>
          <input
            {...register('picture')}
            id="picture"
            type="file"
            accept=".jpeg,.jpg,.png"
            onChange={handlePictureChange}
          />
          {errors.picture && (
            <p className="form__error">{errors.picture.message}</p>
          )}
          {image && <p className="input__note">Picture saved</p>}
        </div>

        <div className="form__checkbox">
          <input {...register('terms')} type="checkbox" />
          <label htmlFor="terms">I accept Terms and Conditions</label>
          {errors.terms && (
            <p className="form__error">{errors.terms.message}</p>
          )}
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

export default ReactHookForm;
