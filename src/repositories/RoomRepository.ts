import { Room } from '../models/Room';

export class RoomRepository {
  private rooms: Room[] = [];

  public addRoom(room: Room): void {
    this.rooms.push(room);
  }

  public findRoomById(id: string): Room | undefined {
    return this.rooms.find(room => room.getId() === id);
  }

  public updateRoom(room: Room): void {
    const index = this.rooms.findIndex(r => r.getId() === room.getId());
    if (index !== -1) {
      this.rooms[index] = room;
    }
  }

  public deleteRoom(id: string): boolean {
    const index = this.rooms.findIndex(room => room.getId() === id);
    if (index !== -1) {
      this.rooms.splice(index, 1);
      return true;
    }
    return false;
  }

  public getRooms(): Room[] {
    return this.rooms;
  }
}
