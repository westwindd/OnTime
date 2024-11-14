"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RoomController_1 = require("../controllers/RoomController");
const router = (0, express_1.Router)();
const roomController = new RoomController_1.RoomController();
router.post('/', (req, res) => {
    roomController.createRoom(req, res);
});
router.put('/:id', (req, res) => {
    roomController.updateRoom(req, res);
});
router.delete('/:id', (req, res) => {
    roomController.deleteRoom(req, res);
});
exports.default = router;
