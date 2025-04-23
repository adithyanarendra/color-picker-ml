const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const colorRoutes = require('./routes/colorRoutes');
app.use('/api/colors', colorRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello from color picker ML server');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
