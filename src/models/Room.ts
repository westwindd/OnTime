// src/models/Room.ts

import { IRoom } from '../interfaces/IRoom';

export class Room implements IRoom {
  public id: string;
  public name: string;
  public capacity: number;
  public organizationId: string;

  constructor(id: string, name: string, capacity: number, organizationId: string) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.organizationId = organizationId;
  }

  // public getId(): string {
  //   return this.id;
  // }
  // public setId(id: string): void {
  //   this.id = id;
  // }

  public toJSON(): IRoom {
    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      organizationId: this.organizationId,
    };
  }
}
