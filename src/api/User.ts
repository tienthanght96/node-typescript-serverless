import 'reflect-metadata';
import 'source-map-support/register';
import {
  APIGatewayProxyEvent,
  // APIGatewayProxyHandler,
} from 'aws-lambda';
import { UserService } from '../services/User';
import { User } from '../entity/User';
import { Response, ResponseError } from '../helpers/Response';

export const getAllUsers = async (): Promise<Response | ResponseError> => {
  try {
    const users = await UserService.getUsers();
    return new Response({
      statusCode: 200,
      body: { data: users },
    });
  } catch (error) {
    return new ResponseError({
      statusCode: 400,
      body: { message: error.message },
    });
  }
};

export const getUser = async (
  event: APIGatewayProxyEvent
): Promise<Response | ResponseError> => {
  try {
    const id: number = +event.pathParameters.id;
    if (id) {
      const user = await UserService.getUser(id);
      return new Response({
        statusCode: 200,
        body: { data: user },
      });
    }
    throw { message: 'Can not find user with id' };
  } catch (error) {
    return new ResponseError({
      statusCode: 400, // bad request
      headers: { 'content-type': 'application/json' },
      body: { message: error.message },
    });
  }
};

export const createUser = async (
  event: APIGatewayProxyEvent
): Promise<Response | ResponseError> => {
  try {
    const userData: Omit<User, 'id'> = JSON.parse(event.body);
    if (userData) {
      const userCreated = await UserService.createUser(userData);
      return new Response({
        statusCode: 200,
        body: { data: userCreated, message: 'Create new user successfully' },
      });
    }
    throw { message: 'Can not create new user' };
  } catch (error) {
    return new ResponseError({
      statusCode: 400,
      body: { body: { message: error.message } },
    });
  }
};

export const updateUser = async (
  event: APIGatewayProxyEvent
): Promise<Response | ResponseError> => {
  try {
    const userId = +event.pathParameters.id;
    const userData: Omit<User, 'id'> = JSON.parse(event.body);
    if (userId && userData) {
      const userUpdated = await UserService.updateUser(userId, userData);
      return new Response({
        statusCode: 200,
        body: { data: userUpdated, message: 'Update user successfully' },
      });
    }
    throw { message: 'Can not update user' };
  } catch (error) {
    return new ResponseError({
      statusCode: 400,
      body: { message: error.message },
    });
  }
};

export const deleteUser = async (
  event: APIGatewayProxyEvent
): Promise<Response | ResponseError> => {
  try {
    const userId = +event.pathParameters.id;
    if (userId) {
      await UserService.deleteUser(userId);
      return new Response({
        statusCode: 200,
        body: { message: 'Delete user successfully' },
      });
    }
    throw { message: 'Can not delete user' };
  } catch (error) {
    return new ResponseError({
      statusCode: 400,
      body: { message: error.message },
    });
  }
};
