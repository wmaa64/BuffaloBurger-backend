import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
//import paymobRoutes from './routes/paymobRoutes.js';

dotenv.config();

const app = express()

app.use(cors());

/*
// CORS configuration: Allow requests from both the frontend domain and localhost
const allowedOrigins = [
    'https://buffalo-burger-frontend.vercel.app',  // Production Frontend
    'https://localhost:3000'                       // Local Development Frontend
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],            // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],    // Allowed headers
    credentials: true                                     // Allow credentials (cookies, headers)
}));
*/

app.use(express.json());
app.use(morgan('dev'));

//Routes 
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories',categoryRoutes );
app.use('/api/orders', orderRoutes);
//app.use('/api/payments', paymobRoutes);


const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI).then(() => {
    console.log('Database is Connected');
}).catch(err => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
