import { hash } from 'bcrypt';
import { CreateUserDto } from '@/features/users/users.dtos';
import { HttpException } from '@/utils/HttpException';
import { User } from '@/features/users/users.interfaces';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

const users = userModel;

const findAllUser = async (): Promise<User[]> => {
  const result: User[] = await users.find();
  return result;
};

const findUserById = async (userId: string): Promise<User> => {
  if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

  const findUser: User = await users.findOne({ _id: userId });
  if (!findUser) throw new HttpException(409, "You're not user");

  return findUser;
};

const createUser = async (userData: CreateUserDto): Promise<User> => {
  if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  const findUser: User = await users.findOne({ email: userData.email });
  if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

  const hashedPassword = await hash(userData.password, 10);
  const createUserData: User = await users.create({ ...userData, password: hashedPassword });

  return createUserData;
};

const updateUser = async (userId: string, userData: CreateUserDto): Promise<User> => {
  if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  if (userData.email) {
    const findUser: User = await users.findOne({ email: userData.email });
    if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
  }

  if (userData.password) {
    const hashedPassword = await hash(userData.password, 10);
    userData = { ...userData, password: hashedPassword };
  }

  const updateUserById: User = await users.findByIdAndUpdate(userId, { userData });
  if (!updateUserById) throw new HttpException(409, "You're not user");

  return updateUserById;
};

const deleteUser = async (userId: string): Promise<User> => {
  const deleteUserById: User = await users.findByIdAndDelete(userId);
  if (!deleteUserById) throw new HttpException(409, "You're not user");

  return deleteUserById;
};

export { findAllUser, findUserById, createUser, updateUser, deleteUser };
