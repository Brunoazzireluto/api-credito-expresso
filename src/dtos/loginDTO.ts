import * as yup from 'yup';
// import IUser from '../interfaces/user';


export const loginValidationSchema = yup.object().shape({
    username: yup.string().required('Nome de usuário é obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
});