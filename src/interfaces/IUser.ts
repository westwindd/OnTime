// src/interfaces/IUser.ts

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    teamId?: string;
  }
  