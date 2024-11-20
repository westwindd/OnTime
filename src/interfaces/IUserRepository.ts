// src/interfaces/IUserRepository.ts

import { User } from '../models/User';

export interface IUserRepository {
  addUser(user: User): void;
  findUserById(id: string): User | undefined;
  updateUser(user: User): void;
  deleteUser(id: string): boolean;
  getUsers(): User[];
}
