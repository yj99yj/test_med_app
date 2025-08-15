const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToMongo = require('./db');
const app = express();


app.set('view engine','ejs')
app.use(express.static('public'))

// Port
const PORT = process.env.PORT || 8181;

// ✅ Correct CORS setup (remove duplicates)
app.use(cors({
  origin: '*', // In production, replace with actual domain
  methods: ['GET', 'POST'],
}));

// ✅ Middleware
app.use(express.json());

// ✅ Log every request (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ Connect to MongoDB
connectToMongo();

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));

// ✅ Root route (optional)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});