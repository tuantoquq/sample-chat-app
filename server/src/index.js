import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoDBConnect from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.json());


const PORT = process.env.SERVER_PORT || 8081;
app.use(authRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
    mongoDBConnect();
});