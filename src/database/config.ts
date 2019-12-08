import { ConnectionOptions, Connection, createConnection } from 'typeorm';
import { User } from '../entity/User';

export const connectConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'thangtran',
  database: 'natours',
  synchronize: true,
  logging: false,
  entities: [User],
  // "migrations": ["src/migration/**/*.ts"],
  // "subscribers": ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export const connectDatabase = async (): Promise<Connection> => {
  return await createConnection(connectConfig);
};
