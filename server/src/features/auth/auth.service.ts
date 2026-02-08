import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import env from '@/config/env';
import { CreateUserDto } from '@/features/users/users.dtos';
import { HttpException } from '@/utils/HttpException';
import { DataStoredInToken, TokenData } from '@/features/auth/auth.interfaces';
import { User } from '@/features/users/users.interfaces';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

const users = userModel;

const signup = async (userData: CreateUserDto): Promise<User> => {
  if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  const findUser: User = await users.findOne({ email: userData.email });
  if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

  const hashedPassword = await hash(userData.password, 10);
  const createUserData: User = await users.create({ ...userData, password: hashedPassword });

  return createUserData;
};

const login = async (userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> => {
  if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  const findUser: User = await users.findOne({ email: userData.email });
  if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

  const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
  if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

  const tokenData = createToken(findUser);
  const cookie = createCookie(tokenData);

  return { cookie, findUser };
};

const logout = async (userData: User): Promise<User> => {
  if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  const findUser: User = await users.findOne({ email: userData.email, password: userData.password });
  if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

  return findUser;
};

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };
  const secretKey: string = env.jwtSecret;
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

export { signup, login, logout, createToken, createCookie };
