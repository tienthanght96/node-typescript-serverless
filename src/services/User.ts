import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { DatabaseService } from './Database';

export class UserService {
  public static async getUsers(): Promise<User[]> {
    try {
      const databaseService = await DatabaseService.connectDatabase();
      const user = await getRepository(User).find();
      await databaseService.closeConnect();
      return user;
    } catch (error) {
      throw error;
    }
  }

  public static async getUser(id: number): Promise<User> {
    try {
      const databaseService = await DatabaseService.connectDatabase();
      const user = await getRepository(User).findOneOrFail({ id: id });
      await databaseService.closeConnect();
      return user;
    } catch (error) {
      throw error;
    }
  }

  public static async createUser(userData: Omit<User, 'id'>): Promise<User> {
    try {
      const databaseService = await DatabaseService.connectDatabase();
      const user = new User();
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      user.age = userData.age;
      const newUser = await getRepository(User).save(userData);
      await databaseService.closeConnect();
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  public static async updateUser(
    userId: number,
    userData: Omit<User, 'id'>
  ): Promise<User> {
    try {
      const databaseService = await DatabaseService.connectDatabase();
      const user = await getRepository(User).findOneOrFail(userId);
      const userUpdated = getRepository(User).merge(user, userData);
      await getRepository(User).save(userUpdated);
      await databaseService.closeConnect();
      return userUpdated;
    } catch (error) {
      throw error;
    }
  }
  /**
   * @description Delete user
   *
   * @param {number} userId user id
   */
  public static async deleteUser(userId: number): Promise<User> {
    try {
      const databaseService = await DatabaseService.connectDatabase();
      const userRepository = getRepository(User);
      const userDelete = await userRepository.findOneOrFail(userId);
      await userRepository.delete(userDelete);
      await databaseService.closeConnect();
      return userDelete;
    } catch (error) {
      throw error;
    }
  }
}
