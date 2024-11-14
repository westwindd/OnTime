"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
router.post('/', (req, res) => {
    userController.createUser(req, res);
});
router.put('/:id', (req, res) => {
    userController.updateUser(req, res);
});
router.delete('/:id', (req, res) => {
    userController.deleteUser(req, res);
});
router.post('/invite', (req, res) => {
    userController.inviteUser(req, res);
});
exports.default = router;
