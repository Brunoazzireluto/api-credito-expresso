import { AppDataSource } from "../database/data-source";

import { User } from "../entities/user";

const userEntity = AppDataSource.getRepository(User);

export class LoginRepository {
    async findByUsername(username: string) {
        try {
            let user = await userEntity.findOne({ where: { username: username } });
            return user;
        } catch (error) {
            throw error;
        }
    }
}