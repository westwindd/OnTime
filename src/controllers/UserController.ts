import { Request, Response } from 'express';
import { User } from '../models/User';
import { sendEmail } from '../utils/emailService';

const users: User[] = []; // Replace with database logic

export class UserController {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.inviteUser = this.inviteUser.bind(this);
  }

  public createUser(req: Request, res: Response) {
    console.log('dsffds')
    const { id, name, email, password, role, teamId } = req.body;
    const newUser = new User(id, name, email, password, role, teamId);
    users.push(newUser);
    console.log(newUser);
    res.status(201).json(newUser);
  }

  public updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updatedData = req.body;
    const user = users.find(user => user.id === id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    Object.assign(user, updatedData);
    res.status(200).json(user);
  }

  public deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
    users.splice(userIndex, 1);
    res.status(204).send();
  }

  public inviteUser(req: Request, res: Response) {
    const { email, teamId } = req.body;
    sendEmail(email, 'You are invited to join On Time', `Join team ${teamId}`);
    res.status(200).json({ message: `Invitation sent to ${email}` });
  }
}
