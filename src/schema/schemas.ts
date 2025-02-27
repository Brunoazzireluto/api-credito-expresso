import * as yup from 'yup';

export const userSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .max(100, 'Username cannot exceed 100 characters'),
  
  password: yup
    .string()
    .required('Password is required')
    .max(255, 'Password hash cannot exceed 255 characters'),
});

export const transactionSchema = yup.object().shape({
  amount: yup
    .number()
    .required('Amount is required')
    .typeError('Amount must be a number'),
  
  type: yup
    .string()
    .required('Transaction type is required')
    .max(255, 'Transaction type cannot exceed 255 characters'),
  
  user_id: yup
    .number()
    .required('User ID is required')
    .positive('User ID must be a positive number')
    .integer('User ID must be an integer'),
});

export const createUserSchema = userSchema;

export const updateUserSchema = userSchema.partial();

export const createTransactionSchema = transactionSchema;

export const updateTransactionSchema = transactionSchema.partial();