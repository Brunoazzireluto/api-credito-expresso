import { AppDataSource } from "../database/data-source";
import { Transaction } from "../entities/transaction";
import { ITransaction } from "../interfaces/transaction";

const transactionEntity = AppDataSource.getRepository(Transaction);

export class TransactionRepository {
    async create(transactionData: ITransaction) {
        try {
            const transaction = await transactionEntity.save(transactionData);
            return transaction;
        } catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const transactions = await transactionEntity.find({order: {create_date: 'DESC'}});
            return transactions;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number) {
        try {
            const transaction = await transactionEntity.findOne({ where: { id } });
            return transaction;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, transactionData: Partial<ITransaction>) {
        try {
            await transactionEntity.update(id, transactionData);
            const updatedTransaction = await transactionEntity.findOne({ where: { id } });
            return updatedTransaction;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            return await transactionEntity.softDelete(id);
        } catch (error) {
            throw error;
        }
    }
}