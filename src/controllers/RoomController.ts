// src/controllers/RoomController.ts

import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { Room } from '../models/Room';
import { IRoom } from '../interfaces/IRoom';
import { IRoomRepository } from '../interfaces/IRoomRepository';
import { roomRepository } from '../repositories';

export class RoomController {
  constructor() {}

  public create(req: Request, res: Response): void {
    const { id, name, capacity, organizationId } = req.body;
    const newRoom = new Room(id, name, capacity, organizationId);

    if (newRoom instanceof Room) {
      roomRepository.addRoom(newRoom);
      res.status(201).json(newRoom.toJSON());
    } else {
      res.status(400).json({ message: 'Invalid room data' });
    }
  }

  public update(req: Request, res: Response): void {
    const { id } = req.params;
    const { name, capacity, organizationId } = req.body;
    const room = roomRepository.findRoomById(id);

    if (room instanceof Room) {
      if (name !== undefined) room.name = name;
      if (capacity !== undefined) room.capacity = capacity;
      if (organizationId !== undefined) room.organizationId = organizationId;

      roomRepository.updateRoom(room);
      res.status(200).json(room.toJSON());
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  }

  public delete(req: Request, res: Response): void {
    const { id } = req.params;
    const isDeleted = roomRepository.deleteRoom(id);

    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  }
}
