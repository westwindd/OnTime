// src/controllers/BookingController.ts

import { Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { roomRepository, userRepository, bookingRepository } from '../repositories';

export class BookingController {

  public createBooking = (req: Request, res: Response): void => {
    const { id, roomId, userId, startTime, endTime } = req.body;

    if (!id || !roomId || !userId || !startTime || !endTime) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const parsedStartTime = new Date(startTime);
    const parsedEndTime = new Date(endTime);

    if (isNaN(parsedStartTime.getTime()) || isNaN(parsedEndTime.getTime())) {
      res.status(400).json({ message: 'Invalid date format' });
      return;
    }

    if (parsedStartTime >= parsedEndTime) {
      res.status(400).json({ message: 'Start time must be before end time' });
      return;
    }

    if (parsedStartTime < new Date()) {
      res.status(400).json({ message: 'Start time must be in the future' });
      return;
    }

    const room = roomRepository.findRoomById(roomId);
    if (!room) {
      res.status(404).json({ message: 'Room not found' });
      return;
    }

    const user = userRepository.findUserById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const hasConflict = this.checkBookingConflict(roomId, parsedStartTime, parsedEndTime);
    if (hasConflict) {
      res.status(409).json({ message: 'Room is already booked for the specified time' });
      return;
    }

    const newBooking = new Booking(
      id,
      roomId,
      userId,
      parsedStartTime,
      parsedEndTime
    );

    bookingRepository.addBooking(newBooking);
    res.status(201).json(newBooking.toJSON());
  };

  public deleteBooking = (req: Request, res: Response): void => {
    const { id } = req.params;

    const isDeleted = bookingRepository.deleteBooking(id);
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  };

  public getBookingsByRoom = (req: Request, res: Response): void => {
    const { roomId } = req.params;

    const room = roomRepository.findRoomById(roomId);
    if (!room) {
      res.status(404).json({ message: 'Room not found' });
      return;
    }

    const bookings = bookingRepository.findBookingsByRoomId(roomId);

    res.status(200).json(bookings.map(booking => booking.toJSON()));
  };

  private checkBookingConflict(
    roomId: string,
    startTime: Date,
    endTime: Date
  ): boolean {
    const newBookingSlot = { startTime, endTime };
    const bookings = bookingRepository.findBookingsByRoomId(roomId);

    return bookings.some((booking) => {
      return this.overlapsWith(newBookingSlot, booking);
    });
  }

  private overlapsWith(slot1: { startTime: Date, endTime: Date }, slot2: Booking): boolean {
    return slot1.startTime < slot2.endTime && slot1.endTime > slot2.startTime;
  }
}
