//dependencies & port
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const api = require('./routes/api');
const html = require('./routes/html');
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname, '/public/assets'));
app.use('/routes/api', api);
app.use('/routes/html', html);

app.listen(PORT, () => {
    console.log(`Open me here: http://localhost:${PORT}`);
  });

//routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});