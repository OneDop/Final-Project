const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/FinalDocker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ageSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
const Age = mongoose.model('Age', ageSchema, 'Age');
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/add', async (req, res) => {
  const { name, age } = req.body;
  try {
    const newRecord = new Age({ name, age });
    await newRecord.save();
    res.json({ message: 'Data saved!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/find/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const record = await Age.findOne({ name });
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ message: 'No record found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
