import express from 'express'
import sectionRoutes from './routes/user.routes';
import './db';

// const express = require('express')
const app = express();
const PORT: number = parseInt(process.env.PORT || '3000');

app.use(express.json());

app.use('/', sectionRoutes);

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
