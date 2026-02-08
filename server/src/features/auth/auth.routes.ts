import { Router } from 'express';
import { CreateUserDto } from '@/features/users/users.dtos';
import { Routes } from '@/types/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { logIn, logOut, signUp } from '@/features/auth/auth.controller';

const router = Router();

router.post('/signup', validationMiddleware(CreateUserDto, 'body'), signUp);
router.post('/login', validationMiddleware(CreateUserDto, 'body'), logIn);
router.post('/logout', authMiddleware, logOut);

const authRoute: Routes = { path: '/', router };

export default authRoute;
