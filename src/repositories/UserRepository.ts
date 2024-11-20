// src/repositories/UserRepository.ts

import { IUserRepository } from '../interfaces/IUserRepository';
import { User } from '../models/User';

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  public addUser(user: User): void {
    if (user instanceof User) {
      this.users.push(user);

    } else {
      throw new Error('Invalid user object');
    }
  }
  

  public findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  public updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  public deleteUser(id: string): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  public getUsers(): User[] {
    return this.users;
  }
  
}
