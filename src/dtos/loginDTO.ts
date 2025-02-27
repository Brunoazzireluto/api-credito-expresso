import * as yup from 'yup';
// import IUser from '../interfaces/user';


export const loginValidationSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('Password is required'),
});