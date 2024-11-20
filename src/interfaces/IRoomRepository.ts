// src/interfaces/IRoomRepository.ts

import { IRoom } from './IRoom';

export interface IRoomRepository {
  addRoom(room: IRoom): void;
  findRoomById(id: string): IRoom | undefined;
  updateRoom(room: IRoom): void;
  deleteRoom(id: string): boolean;
  getRooms(): IRoom[];
}
