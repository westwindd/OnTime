"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = authorizeAdmin;
function authorizeAdmin(req, res, next) {
    const userRole = req.headers['role'];
    if (userRole === 'admin')
        next();
    else
        res.status(403).json({ message: 'Access denied' });
}
