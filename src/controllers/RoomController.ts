import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { Room } from '../models/Room';
import { RoomRepository } from '../repositories/RoomRepository';

export class RoomController extends BaseController {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    super();
    this.roomRepository = roomRepository;
  }

  public create(req: Request, res: Response): void {
    const { id, name, capacity, organizationId } = req.body;
    const newRoom = new Room(id, name, capacity, organizationId);
    this.roomRepository.addRoom(newRoom);
    res.status(201).json(newRoom.toJSON());
  }

  public update(req: Request, res: Response): Response | void {
    const { id } = req.params;
    const { name, capacity, organizationId } = req.body;
    const room = this.roomRepository.findRoomById(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (name) room.setName(name);
    if (capacity) room.setCapacity(capacity);
    if (organizationId) room.setOrganizationId(organizationId);

    this.roomRepository.updateRoom(room);
    res.status(200).json(room.toJSON());
  }

  public delete(req: Request, res: Response): Response | void {
    const { id } = req.params;
    const isDeleted = this.roomRepository.deleteRoom(id);
    if (!isDeleted) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(204).send();
  }
}
