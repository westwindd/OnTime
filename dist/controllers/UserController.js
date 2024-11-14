"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
const emailService_1 = require("../utils/emailService");
const users = []; // Replace with database logic
class UserController {
    constructor() {
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.inviteUser = this.inviteUser.bind(this);
    }
    createUser(req, res) {
        const { id, name, email, password, role, teamId } = req.body;
        const newUser = new User_1.User(id, name, email, password, role, teamId);
        users.push(newUser);
        res.status(201).json(newUser);
    }
    updateUser(req, res) {
        const { id } = req.params;
        const updatedData = req.body;
        const user = users.find(user => user.id === id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        Object.assign(user, updatedData);
        res.status(200).json(user);
    }
    deleteUser(req, res) {
        const { id } = req.params;
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1)
            return res.status(404).json({ message: 'User not found' });
        users.splice(userIndex, 1);
        res.status(204).send();
    }
    inviteUser(req, res) {
        const { email, teamId } = req.body;
        (0, emailService_1.sendEmail)(email, 'You are invited to join On Time', `Join team ${teamId}`);
        res.status(200).json({ message: `Invitation sent to ${email}` });
    }
}
exports.UserController = UserController;
