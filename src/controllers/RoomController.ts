import { Request, Response } from 'express';
import { Room } from '../models/Room';

const rooms: Room[] = [];

export class RoomController {
  constructor() {
    this.createRoom = this.createRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }

  public createRoom(req: Request, res: Response) {
    const { id, name, capacity, organizationId } = req.body;
    const newRoom = new Room(id, name, capacity, organizationId);
    rooms.push(newRoom);
    res.status(201).json(newRoom);
  }

  public updateRoom(req: Request, res: Response) {
    const { id } = req.params;
    const updatedData = req.body;
    const room = rooms.find(room => room.id === id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    Object.assign(room, updatedData);
    res.status(200).json(room);
  }

  public deleteRoom(req: Request, res: Response) {
    const { id } = req.params;
    const roomIndex = rooms.findIndex(room => room.id === id);
    if (roomIndex === -1) return res.status(404).json({ message: 'Room not found' });
    rooms.splice(roomIndex, 1);
    res.status(204).send();
  }
}
