"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
class Organization {
    constructor(id, name, rooms = [], teams = []) {
        this.id = id;
        this.name = name;
        this.rooms = rooms;
        this.teams = teams;
    }
}
exports.Organization = Organization;
