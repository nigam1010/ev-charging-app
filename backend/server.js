const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stations', require('./routes/stations'));

// ✅ Test DB connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected...');
    return sequelize.sync({ alter: true }); // Sync models without dropping data
  })
  .then(() => {
    console.log('✅ Models synced successfully.');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
  });
