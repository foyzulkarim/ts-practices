import { DataSource } from 'typeorm';
import { Person } from './person.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'mydatabase.sqlite', // You can change the database name
  synchronize: true, // This will create the database and tables automatically
  logging: false,
  entities: [Person],
});
