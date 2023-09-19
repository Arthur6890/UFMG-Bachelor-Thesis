// src/server.ts
import express, { Application } from 'express';
import sectionRoutes from './routes/sectionRoutes';
import './db';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000');

app.use(express.json());

app.use('/api', sectionRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
