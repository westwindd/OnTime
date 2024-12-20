// src/models/User.ts

import { Person } from './Person';
import { IUser } from '../interfaces/IUser';

export class User extends Person implements IUser {
  public email: string;
  public password: string;
  public role: string;
  public teamId: string | null;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string = 'user',
    teamId: string | null = null
  ) {
    super(id, name); 
    this.email = email;
    this.password = password;
    this.role = role;
    this.teamId = teamId;
  }
  public setTeamId(teamId: string | null): void {
      this.teamId = teamId;
  }

  public getTeamId(): string | null {
      return this.teamId;
  }
  public toJSON(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      teamId: this.teamId,
    };
  }
}
