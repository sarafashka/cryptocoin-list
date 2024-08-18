import React from 'react';
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormInputs) => {
    dispatch(addFormAnswers(data));
    navigate('/');
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

        <div className="input-field">
          <label>Picture</label>
          <input {...register('picture')} />
          {errors.picture && (
            <p className="form__error">{errors.picture.message}</p>
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
