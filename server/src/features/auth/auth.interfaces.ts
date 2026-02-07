import { Request } from 'express';
import { User } from '@/features/users/users.interfaces';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
