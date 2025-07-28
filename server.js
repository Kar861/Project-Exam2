const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const loginRoutes = require('./routes/login');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/login', loginRoutes);
app.use('/tickets', ticketRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })})
        .catch(err => console.error('MongoDB connection error:', err));