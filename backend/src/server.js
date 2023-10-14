"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_routes_1 = require("./routes/user.routes");
require("./db");
// const express = require('express')
var app = (0, express_1.default)();
var PORT = parseInt(process.env.PORT || '3000');
app.use(express_1.default.json());
app.use('/', user_routes_1.default);
app.listen(PORT, function () {
    console.log("Servidor rodando na porta ".concat(PORT));
});
