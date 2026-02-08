import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@/features/users/users.dtos';
import { RequestWithUser } from '@/features/auth/auth.interfaces';
import { User } from '@/features/users/users.interfaces';
import { login, logout, signup } from '@/features/auth/auth.service';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: CreateUserDto = req.body;
    const signUpUserData: User = await signup(userData);

    res.status(201).json({ data: signUpUserData, message: 'signup' });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: CreateUserDto = req.body;
    const { cookie, findUser } = await login(userData);

    res.setHeader('Set-Cookie', [cookie]);
    res.status(200).json({ data: findUser, message: 'login' });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const userData: User = req.user;
    const logOutUserData: User = await logout(userData);

    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    res.status(200).json({ data: logOutUserData, message: 'logout' });
  } catch (error) {
    next(error);
  }
};

export { signUp, logIn, logOut };
