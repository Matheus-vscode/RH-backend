// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/employees', require('./routes/employees'));
app.use('/away', require('./routes/away'));

app.get('/', (req, res) => {
  res.json({ status: "Backend rodando!" });
});

app.listen(PORT, () => console.log(`✅ Backend rodando na porta ${PORT}`));
