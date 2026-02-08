import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@/features/users/users.dtos';
import { User } from '@/features/users/users.interfaces';
import { findAllUser, findUserById, createUser, updateUser, deleteUser } from '@/features/users/users.service';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const findAllUsersData: User[] = await findAllUser();

    res.status(200).json({ data: findAllUsersData, message: 'findAll' });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.id;
    const findOneUserData: User = await findUserById(userId);

    res.status(200).json({ data: findOneUserData, message: 'findOne' });
  } catch (error) {
    next(error);
  }
};

const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: CreateUserDto = req.body;
    const createUserData: User = await createUser(userData);

    res.status(201).json({ data: createUserData, message: 'created' });
  } catch (error) {
    next(error);
  }
};

const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.id;
    const userData: CreateUserDto = req.body;
    const updateUserData: User = await updateUser(userId, userData);

    res.status(200).json({ data: updateUserData, message: 'updated' });
  } catch (error) {
    next(error);
  }
};

const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.id;
    const deleteUserData: User = await deleteUser(userId);

    res.status(200).json({ data: deleteUserData, message: 'deleted' });
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUserById, createUserHandler, updateUserHandler, deleteUserHandler };
