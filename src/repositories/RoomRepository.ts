// src/repositories/RoomRepository.ts

import { IRoomRepository } from '../interfaces/IRoomRepository';
import { IRoom } from '../interfaces/IRoom';
import { Room } from '../models/Room';

export class RoomRepository implements IRoomRepository {
  private rooms: IRoom[] = [];

  public addRoom(room: IRoom): void {
    if (room instanceof Room) {
      this.rooms.push(room);
    } else {
      throw new Error('Invalid room object');
    }
  }

  public findRoomById(id: string): IRoom | undefined {
    return this.rooms.find(room => room.id === id);
  }

  public updateRoom(room: IRoom): void {
    const index = this.rooms.findIndex(r => r.id === room.id);
    if (index !== -1) {
      this.rooms[index] = room;
    }
  }

  public deleteRoom(id: string): boolean {
    const index = this.rooms.findIndex(room => room.id === id);
    if (index !== -1) {
      this.rooms.splice(index, 1);
      return true;
    }
    return false;
  }

  public getRooms(): IRoom[] {
    return this.rooms;
  }
}
