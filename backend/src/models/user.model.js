"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    serialNumber: String,
    name: String,
    surname: String,
    balance: Number,
    profilePhoto: String,
});
exports.User = mongoose_1.default.model('User', userSchema, 'User');
