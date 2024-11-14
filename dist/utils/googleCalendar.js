"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendar = void 0;
exports.createEvent = createEvent;
const googleapis_1 = require("googleapis");
const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URL);
exports.calendar = googleapis_1.google.calendar({ version: 'v3', auth: oauth2Client });
function createEvent(eventDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield exports.calendar.events.insert({
                calendarId: 'primary',
                requestBody: eventDetails,
            });
            return response.data;
        }
        catch (error) {
            console.error('Erro ao criar evento:', error);
        }
    });
}
