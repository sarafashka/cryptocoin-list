import * as yup from 'yup';

export const schema = yup.object().shape({
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
  gender: yup.string().required('Gender is a required field'),
  country: yup.string().required('Country is a required field'),
  picture: yup.string().required('Picture is a required field'),
  terms: yup.boolean().required(),
});
