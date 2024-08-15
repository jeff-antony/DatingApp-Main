import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import connect from "./db.js";
import passport from "passport";
import googleMiddleware from './middlewares/googleMiddleware.js';
import session from 'express-session';
import authRouter from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import dashboardRoutes from './routes/dashboardRoute.js';
import matrimonyRoutes from './routes/matrimonyRoute.js';
import productRoutes from './routes/productRoutes.js'
import chatRoute from './routes/chatRoute.js';
import requestRoutes from './routes/requestRoutes.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import Message from './models/MessageModel.js'; // Ensure this path is correct
import cloudinary from './config/cloudinary.js';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json()); 

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST']
  }
});

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(session({
  secret: 'yourSecretKey21',
  resave: false,
  saveUninitialized: false,
}));

googleMiddleware(passport);

// Routes
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api', userRoutes);
app.use('/api', jobRoutes);
app.use('/api', matrimonyRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/friend-request', requestRoutes);
app.use('/api/product', productRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
    console.log('Message received:', { senderId, receiverId, text });
    const message = new Message({ senderId, receiverId, text });
    await message.save();
    io.to(receiverId).emit('receiveMessage', message);
    // io.to(senderId).emit('receiveMessage', message);
  });

  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 5100;
server.listen(port, () => {
  connect();
  console.log(`Server running on PORT ${port}....`);
});
