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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/sectionRoutes.ts
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const router = express_1.default.Router();
router.get('/user/:serialNumber', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serialNumber = req.params.serialNumber;
        const user = yield user_model_1.User.findOne({ serialNumber: serialNumber });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json({ data: user });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
}));
router.post('/user/:serialNumber/:recharge', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serialNumber, recharge } = req.params;
        const user = yield user_model_1.User.findOne({ serialNumber: serialNumber });
        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
        else {
            user.balance = parseFloat(recharge);
            yield user.save();
            return res.status(200).json({ data: user });
        }
    }
    catch (error) {
        res.status(500).send('Erro ao realizar operação: ' + error);
    }
}));
exports.default = router;
//# sourceMappingURL=user.routes.js.map