"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/sectionRoutes.ts
const express_1 = require("express");
const Section_1 = __importDefault(require("../models/Section"));
const router = (0, express_1.Router)();
router.get('/section/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const section = await Section_1.default.findOne({ name });
        if (!section) {
            return res.status(404).json({ message: 'Seção não encontrada', number: name });
        }
        res.json(section);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar a seção' });
    }
});
router.get('/teste', (req, res) => {
    res.send('Hello World!');
});
exports.default = router;
//# sourceMappingURL=sectionRoutes.js.map