import { DataSource } from 'typeorm';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/database/database.sqlite',
  entities: [path.join(__dirname, '../entities', '*.{ts,js}')],
  migrations: [path.join(__dirname, './migrations/', '*.{ts,js}')],
  synchronize: true, 
  logging: true
});

export const initializeDatabase = async () => {
    try {
      await AppDataSource.initialize();
      console.log('Data Source has been initialized!');
      
      if (process.env.NODE_ENV === 'development') {
        await runSeeds();
      }
    } catch (error) {
      console.error('Error during Data Source initialization:', error);
      throw error;
    }
  };
  
  export const runSeeds = async () => {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      
      console.log('Running seeds...');
      
      const UserSeeder = require('./seeds/user.seed').default;
      await new UserSeeder().run(AppDataSource);
      
      
      console.log('Seeds executed successfully!');
    } catch (error) {
      console.error('Error during seed execution:', error);
      throw error;
    }
  };