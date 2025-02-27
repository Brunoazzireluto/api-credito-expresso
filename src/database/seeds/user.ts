import { DataSource } from 'typeorm';
import {User} from '../../entities/user';
import { hashPassword } from '../../services/passwordService';

export default class UserSeeder {
  async run(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(User);
    
    const password:string = await hashPassword('123456');
    
    const user = userRepository.create({
      username: 'admin',
      password: password
    });
    
    await userRepository.save(user);
    
  }
}