// src/models/User.ts

import { IUser } from '../interfaces/IUser';

export class User implements IUser {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public teamId?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string = 'user',
    teamId?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.teamId = teamId;
  }

  // public setPassword(password: string): void {
  //   this.password = hashPassword(password);
  // }

  public toJSON(): Omit<IUser, 'password'> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      teamId: this.teamId,
    };
  }
}
