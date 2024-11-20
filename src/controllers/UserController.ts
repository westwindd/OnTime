// src/controllers/UserController.ts

import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { User } from '../models/User';
import { IUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';
import { sendEmail } from '../utils/emailService';
import { userRepository } from '../repositories';

export class UserController {

  public create(req: Request, res: Response): void {
    const { id, name, email, password, role, teamId } = req.body;
    const newUser = new User(id, name, email, password, role, teamId);

    if (newUser instanceof User) {
      userRepository.addUser(newUser);
      res.status(201).json(newUser.toJSON());
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  }

  public update(req: Request, res: Response): void {
    const { id } = req.params;
    const { name, email, password, role, teamId } = req.body;
    const user = userRepository.findUserById(id);

    if (user instanceof User) {
      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;
      if (password !== undefined) user.password = password;
      if (role !== undefined) user.role = role;
      if (teamId !== undefined) user.teamId = teamId;

      userRepository.updateUser(user);
      res.status(200).json(user.toJSON());
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  public delete(req: Request, res: Response): void {
    const { id } = req.params;
    const isDeleted = userRepository.deleteUser(id);

    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  public inviteUser(req: Request, res: Response): void {
    const { email, teamId } = req.body;

    if (!email || !teamId) {
      res.status(400).json({ message: 'Missing email or teamId' });
      return;
    }

    try {
      sendEmail(email, 'You are invited to join On Time', `Join team ${teamId}`);
      res.status(200).json({ message: `Invitation sent to ${email}` });
    } catch (error) {
      res.status(500).json({ message: 'Error sending invitation' });
    }
  }
}
