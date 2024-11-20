import { IBooking } from '../interfaces/IBooking';

export class Booking implements IBooking {
  public id: string;
  public roomId: string;
  public userId: string;
  public startTime: Date;
  public endTime: Date;

  constructor(
    id: string,
    roomId: string,
    userId: string,
    startTime: Date,
    endTime: Date
  ) {
    this.id = id;
    this.roomId = roomId;
    this.userId = userId;
    this.startTime = startTime;
    this.endTime = endTime;
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
