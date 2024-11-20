// src/repositories/index.ts

import { RoomRepository } from './RoomRepository';
import { UserRepository } from './UserRepository';
import { BookingRepository } from './BookingRepository';

export const roomRepository = new RoomRepository();
export const userRepository = new UserRepository();
export const bookingRepository = new BookingRepository();
