import { Request, Response } from 'express';
import { createTransactionValidationSchema } from '../dtos/transactionDTO';
import { TransactionRepository } from '../repositories/transactionRepository';

export class TransactionController {
    
    async create(request: Request, response: Response): Promise<any> {
        try {
            await createTransactionValidationSchema.validate(request.body, { 
                abortEarly: false 
            });
            const transactionRepository = new TransactionRepository();
            const transaction = await transactionRepository.create(request.body);
            return response.status(201).json({
                status: 'success',
                data: transaction
            });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro de validação',
                    errors: error.errors
                });
            }
            console.error('Error creating transaction:', error);
            return response.status(500).json({
                status: 'error',
                message: 'Erro interno de servidor'
            });
        }
    }

    async findAll(request: Request, response: Response): Promise<any> {
        try {
            const transactionRepository = new TransactionRepository();
            const transactions = await transactionRepository.findAll();
            return response.status(200).json({
                status: 'success',
                data: transactions
            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return response.status(500).json({
                status: 'error',
                message: 'Erro interno de Servidor'
            });
        }
    }

    async findById(request: Request, response: Response): Promise<any> {
        try {
            const id = parseInt(request.params.id);
            const transactionRepository = new TransactionRepository();
            const transaction = await transactionRepository.findById(id);
            if (!transaction) {
                return response.status(404).json({
                    status: 'error',
                    message: 'transação não encontrada'
                });
            }
            return response.status(200).json({
                status: 'success',
                data: transaction
            });
        } catch (error) {
            console.error('Error fetching transaction:', error);
            return response.status(500).json({
                status: 'error',
                message: 'Erro interno de Servidor'
            });
        }
    }


    async update(request: Request, response: Response): Promise<any> {
        try {
            const id = parseInt(request.params.id);
            await createTransactionValidationSchema.validate(request.body, {
                abortEarly: false
            });
            const transactionRepository = new TransactionRepository();
            const transaction = await transactionRepository.update(id, request.body);
            if (!transaction) {
                return response.status(404).json({
                    status: 'error',
                    message: 'Transação não encontrada'
                });
            }
            return response.status(200).json({
                status: 'success',
                data: transaction
            });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro de Validação',
                    errors: error.errors
                });
            }
            console.error('Error updating transaction:', error);
            return response.status(500).json({
                status: 'error',
                message: 'Erro interno de Validação'
            });
        }
    }

    async delete(request: Request, response: Response): Promise<any> {
        try {
            const id = parseInt(request.params.id);
            const transactionRepository = new TransactionRepository();
            const transaction = await transactionRepository.delete(id);
            if (!transaction) {
                return response.status(404).json({
                    status: 'error',
                    message: 'Transação Não encontrada'
                });
            }
            return response.status(200).json({
                status: 'success',
                message: 'Transação deletada com sucesso!'
            });
        } catch (error) {
            console.error('Error deleting transaction:', error);
            return response.status(500).json({
                status: 'error',
                message: 'Erro interno de servidor'
            });
        }
    }
}