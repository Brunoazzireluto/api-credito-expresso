import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import * as yup from 'yup';
import { loginValidationSchema } from '../dtos/loginDTO';
import {createUserSchema} from "../schema/schemas"
import { LoginRepository } from '../repositories/LoginRepository';
import { checkPassword } from '../services/passwordService';

export class LoginController {
  async login(request: Request, response: Response): Promise<any> {
    try {

      await loginValidationSchema.validate(request.body, { abortEarly: false });

      const { username, password } = request.body;

      const loginRepository = new LoginRepository();

      const user = await loginRepository.findByUsername(username);
      
      if (!user) {
        return response.status(401).json({ error: 'Credenciais inválidas' });
      }

      const passwordMatch = await checkPassword(password, user.password);

      if (!passwordMatch) {
        return response.status(401).json({ error: 'Credenciais inválidas' });
      }
        
      const token = sign(
        {
          userId: user.id,
          username: user.username
        },
        process.env.JWT_SECRET || 'default_secret',
        {
          expiresIn: '1d'
        }
      );

      const { password: _, ...userWithoutPassword } = user;

      return response.json({
        user: userWithoutPassword,
        token
      });

    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return response.status(400).json({
          error: 'Erro de Validação',
          messages: error.errors
        });
      }

      return response.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }
}