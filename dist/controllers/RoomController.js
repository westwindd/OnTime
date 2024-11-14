"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const Room_1 = require("../models/Room");
const rooms = []; // Replace with database logic
class RoomController {
    constructor() {
        this.createRoom = this.createRoom.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
    }
    createRoom(req, res) {
        const { id, name, capacity, organizationId } = req.body;
        const newRoom = new Room_1.Room(id, name, capacity, organizationId);
        rooms.push(newRoom);
        res.status(201).json(newRoom);
    }
    updateRoom(req, res) {
        const { id } = req.params;
        const updatedData = req.body;
        const room = rooms.find(room => room.id === id);
        if (!room)
            return res.status(404).json({ message: 'Room not found' });
        Object.assign(room, updatedData);
        res.status(200).json(room);
    }
    deleteRoom(req, res) {
        const { id } = req.params;
        const roomIndex = rooms.findIndex(room => room.id === id);
        if (roomIndex === -1)
            return res.status(404).json({ message: 'Room not found' });
        rooms.splice(roomIndex, 1);
        res.status(204).send();
    }
}
exports.RoomController = RoomController;
