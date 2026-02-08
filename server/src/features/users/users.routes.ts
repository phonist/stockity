import { Router } from 'express';
import { CreateUserDto } from '@/features/users/users.dtos';
import { Routes } from '@/types/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { createUserHandler, deleteUserHandler, getUserById, getUsers, updateUserHandler } from '@/features/users/users.controller';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', validationMiddleware(CreateUserDto, 'body'), createUserHandler);
router.put('/users/:id', validationMiddleware(CreateUserDto, 'body', true), updateUserHandler);
router.delete('/users/:id', deleteUserHandler);

const usersRoute: Routes = { path: '/users', router };

export default usersRoute;
