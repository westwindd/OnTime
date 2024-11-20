// src/models/Booking.ts

import { TimeSlot } from './TimeSlot';
import { IBooking } from '../interfaces/IBooking';

export class Booking extends TimeSlot implements IBooking {
  public id: string;
  public roomId: string;
  public userId: string;

  constructor(
    id: string,
    roomId: string,
    userId: string,
    startTime: Date,
    endTime: Date
  ) {
    super(startTime, endTime); 
    this.id = id;
    this.roomId = roomId;
    this.userId = userId;
  }

  public toJSON(): IBooking {
    return {
      id: this.id,
      roomId: this.roomId,
      userId: this.userId,
      startTime: this.startTime,
      endTime: this.endTime,
    };
  }
}
