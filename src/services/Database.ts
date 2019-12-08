import { connectDatabase } from '../database/config';
import { Connection } from 'typeorm';

export class DatabaseService {
  public static async connectDatabase(): Promise<DatabaseService> {
    const connection = await connectDatabase();
    console.log('✅Connect database success 💯!');
    return new DatabaseService(connection);
  }

  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  get connection() {
    return this._connection;
  }

  public async closeConnect(): Promise<void> {
    await this._connection.close();
  }
}
