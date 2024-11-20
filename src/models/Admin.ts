// src/models/Admin.ts

import { Person } from './Person';
import { IUser } from '../interfaces/IUser';

export class Admin extends Person implements IUser {
  public email: string;
  public password: string = '';
  public role: string;
  public teamId: string | null;
  public permissions: string[];

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    teamId: string | null,
    permissions: string[]
  ) {
    super(id, name);
    this.email = email;
    this.role = 'admin';
    this.teamId = teamId;
    this.role = 'admin';
    this.permissions = permissions;
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
      teamId: null,
    };
  }

}
