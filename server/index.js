// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// IMPORT ROUTES HERE <-- NEW
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION (Same as before)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// --- ROUTES SETUP ---
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
// --------------------

// Basic Test Route (Keep this for debugging)
app.get('/', (req, res) => {
  res.send('API is running and connected to DB.');
});

// --- ERROR HANDLING MIDDLEWARE ---
// 1. Catches any requests that didn't hit an existing route (404)
app.use(notFound); 
// 2. Catches errors thrown by routes or middleware (e.g., database connection issues)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});