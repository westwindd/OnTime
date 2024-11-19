import { Request, Response } from 'express';
import { User } from '../models/User';
import { sendEmail } from '../utils/emailService';

const users: User[] = []; 

export class UserController {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.inviteUser = this.inviteUser.bind(this);
  }

  public createUser(req: Request, res: Response) {
    console.log('Creating a new user...');
    const { id, name, email, password, role, teamId } = req.body;
    console.log(req.body);
    if (!id || !name || !email || !password) {
      console.error('Invalid input: Missing required fields.');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const newUser = new User(id, name, email, password, role, teamId);
      users.push(newUser);
      console.log('User created:', newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updatedData = req.body;

    console.log(`Updating user with ID: ${id}`);
    const user = users.find(user => user.id === id);
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    Object.assign(user, updatedData);
    console.log('Updated user:', user);
    res.status(200).json(user);
  }

  public deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    console.log(`Deleting user with ID: ${id}`);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    console.log(`User with ID: ${id} deleted.`);
    res.status(204).send();
  }

  public inviteUser(req: Request, res: Response) {
    const { email, teamId } = req.body;

    if (!email || !teamId) {
      console.error('Invalid input: Missing email or teamId.');
      return res.status(400).json({ message: 'Missing email or teamId' });
    }

    console.log(`Sending invitation to ${email} for team ${teamId}`);
    try {
      sendEmail(email, 'You are invited to join On Time', `Join team ${teamId}`);
      res.status(200).json({ message: `Invitation sent to ${email}` });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending invitation' });
    }
  }
}
