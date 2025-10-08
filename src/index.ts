import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';

import { routes } from './router';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const port = 3006;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(routes)

    app.listen(port, () => {
      console.log(`servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.log('erro ao conectar ao banco de dados', error));
