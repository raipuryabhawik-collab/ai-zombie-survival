const express = require('express');
const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Backend running 🚀');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

