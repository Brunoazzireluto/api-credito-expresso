import { AppDataSource } from "../database/data-source";

import { User } from "../entities/user";

const userEntity = AppDataSource.getRepository(User);

export class LoginRepository {
    async findByUsername(username: string) {
        try {
            let user = await userEntity
                .createQueryBuilder('user')
                .where('user.username = :username', { username })
                .getOne();
            return user;
        } catch (error) {
            throw error;
        }
    }
}