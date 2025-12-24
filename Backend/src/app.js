const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('../src/routes/auth.routes');
const chatRoutes = require('../src/routes/chat.routes');
const msgRoutes = require('./routes/message.routes');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "https://gpt-clone-zoro.onrender.com",
    "http://localhost:5173",
  ],
  credentials: true,
}));

app.use(express.static(path.join(__dirname, "../public")));
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/messages", msgRoutes);

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;