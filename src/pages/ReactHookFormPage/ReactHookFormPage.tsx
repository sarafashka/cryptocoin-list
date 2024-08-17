import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './ReactHookFormPage.css';

interface IFormInput {
  name: string;
  age: number;
  email: string;
  sex: string;
  country: string;
  picture: string;
  terms: boolean;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .test(
      'first-letter-uppercase',
      'First letter should be uppercase',
      (value) => {
        if (!value) return true;
        return /^[A-ZA-ЯЁ]/.test(value);
      }
    ),
  age: yup
    .number()
    .min(0, 'Age can not be negative')
    .required('Age is a required field'),
  email: yup.string().email().required('Email is a required field'),
  sex: yup.string().required('Sex is a required field'),
  country: yup.string().required('Country is a required field'),
  picture: yup.string().required('Picture is a required field'),
  terms: yup.boolean().required(),
});

export const ReactHookFormPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <>
      <h2>React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input
            {...register('name')}
            id="name"
            className="form__input"
            type="text"
          />
          {errors.name && <p className="form__error">{errors.name.message}</p>}
        </div>

        <label>Age</label>
        <input {...register('age')} />
        {errors.age && <p className="form__error">{errors.age.message}</p>}

        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p className="form__error">{errors.email.message}</p>}

        <div className="input-field">
          <label>
            <div>
              <input type="radio" value="male" {...register('sex')} />
              male
            </div>
          </label>
          <label>
            <div>
              <input type="radio" value="female" {...register('sex')} />
              female
            </div>
          </label>
          {errors.sex && <p className="form__error">{errors.sex.message}</p>}
        </div>

        <div className="input-field">
          <label>Picture</label>
          <input {...register('picture')} />
          {errors.picture && (
            <p className="form__error">{errors.picture.message}</p>
          )}
        </div>

        <label>Country</label>
        <input {...register('country')} />
        {errors.country && (
          <p className="form__error">{errors.country.message}</p>
        )}
        <input {...register('terms')} type="checkbox" />
        {errors.terms && <p className="form__error">{errors.terms.message}</p>}

        <input type="submit" />
      </form>
    </>
  );
};

export default ReactHookFormPage;
