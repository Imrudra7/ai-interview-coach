const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());



// API routes (agar hai to)
app.get('/api/hello', (req, res) => {
  return res.json({ msg: 'Hello from backend!' });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
});
