const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/api/interview', async (req, res) => {
  const { prompt } = req.body;

  try {
    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3', // or the model you've installed
        prompt: `Pretend you are an interviewer. Respond to this: ${prompt}`
      })
    });

    const data = await ollamaRes.json();
    return res.json({ reply: data.response });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});



// API routes (agar hai to)
app.get('/api/hello', (req, res) => {
  return res.json({ msg: 'Hello from backend!' });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
});
