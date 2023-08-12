import express from 'express';
import cors from 'cors';
import storesRouter from './stores.js';
import itemsRouter from './items.js';
import mongoose from 'mongoose';

const port = 3001;
const app = express();

// use CORS and Express
app.use(cors());
app.use(express.json());

// connect to the database in MongoDB, attach connection to the app instance
// Mongoose is weird with localhost, some setting needs to be toggled so I'm just hardcoding what Mongoose uses by default to avoid that
//await mongoose.connect('mongodb://localhost:27017/proj')
await mongoose.connect('mongodb://127.0.0.1:27017/proj');

// use storesRouter and itemsRouter
app.use(storesRouter);
app.use(itemsRouter);

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
})
