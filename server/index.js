import express from 'express';
import { displayData } from './controllers/data.controllers.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
    return res.send("Welcome to server..")
})

app.get("/get-data", displayData)

app.listen(8081, () => console.log(`Listening on port 8081`))