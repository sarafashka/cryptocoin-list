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
    .typeError('Age must be a number')
    .min(0, 'Age must be positive')
    .required('Age is a required field'),
  email: yup.string().email().required('Email is a required field'),
  gender: yup.string().required('Gender is a required field'),
  country: yup.string().required('Country is a required field'),
  picture: yup.string().required('Picture is a required field'),
  terms: yup.boolean().required(),
  password: yup
    .string()
    .required('Password is required')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&#]/,
      'Password must contain at least one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});
