// src/interfaces/IBookingRepository.ts

import { Booking } from '../models/Booking';

export interface IBookingRepository {
  addBooking(booking: Booking): void;
  findBookingById(id: string): Booking | undefined;
  findBookingsByRoomId(roomId: string): Booking[];
  deleteBooking(id: string): boolean;
  getBookings(): Booking[];
}
