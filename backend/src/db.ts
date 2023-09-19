// src/db.ts
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/MonografiaII.user')
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro de conexão com o MongoDB:', error);
  });
