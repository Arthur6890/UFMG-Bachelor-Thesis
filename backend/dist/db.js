"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/db.ts
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/MonografiaII.user')
    .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso.');
})
    .catch((error) => {
    console.error('Erro de conexão com o MongoDB:', error);
});
//# sourceMappingURL=db.js.map