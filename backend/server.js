const express = require('express');
const path = require('path');
const app = express();

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API routes (agar hai to)
app.get('/api/hello', (req, res) => {
  res.json({ msg: 'Hello from backend!' });
});

// Catch-all route to serve React for any unknown route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
});
