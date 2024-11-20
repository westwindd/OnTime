// src/repositories/BookingRepository.ts

import { IBookingRepository } from '../interfaces/IBookingRepository';
import { Booking } from '../models/Booking';

export class BookingRepository implements IBookingRepository {
  private bookings: Booking[] = [];

  public addBooking(booking: Booking): void {
    if (booking instanceof Booking) {
      this.bookings.push(booking);
    } else {
      throw new Error('Invalid booking object');
    }
  }

  public findBookingById(id: string): Booking | undefined {
    return this.bookings.find(booking => booking.id === id);
  }

  public findBookingsByRoomId(roomId: string): Booking[] {
    return this.bookings.filter(booking => booking.roomId === roomId);
  }

  public deleteBooking(id: string): boolean {
    const index = this.bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
      this.bookings.splice(index, 1);
      return true;
    }
    return false;
  }

  public getBookings(): Booking[] {
    return this.bookings;
  }
}
