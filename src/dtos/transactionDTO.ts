import * as yup from 'yup';

export const createTransactionValidationSchema = yup.object().shape({
    amount: yup
        .number()
        .required('Valor é obrigatório')
        .typeError('Valor deve ser um número'),

    type: yup
        .string()
        .required('Tipo de transação é obrigatório')
        .max(255, 'Tipo de transação não pode ser maior que 255 caracteres'),

    user_id: yup
        .number()
        .required('ID do usuário é obrigatório')
        .positive('ID do usuário não pode ser negativo')
        .integer('ID do usuário deve ser um número inteiro')
});

export const updateTransactionValidationSchema = yup.object().shape({
    amount: yup
        .number()
        .required('Valor é obrigatório')
        .typeError('Valor deve ser um número'),

    type: yup
        .string()
        .required('Tipo de transação é obrigatório')
        .max(255, 'Tipo de transação não pode ser maior que 255 caracteres'),
    
    user_id: yup
        .number()
        .required('ID do usuário é obrigatório')
        .positive('ID do usuário deve ser um número positivo')
        .integer('ID do usuário deve ser um número inteiro')
});