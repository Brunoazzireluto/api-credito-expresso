import { hash, compare } from 'bcrypt';

export const checkPassword = async (password: string, hashedPassword: string): Promise<boolean> => 
  compare(password, hashedPassword);

export const hashPassword = async (password: string): Promise<string> => 
  hash(password, 8);