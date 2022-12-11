//dependencies & port
const express = require('express');
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const api = require('./routes/api');

const PORT = process.env.PORT || 5000;

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use('/api', api);

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