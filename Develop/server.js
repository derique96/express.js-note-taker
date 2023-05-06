const express = require('express');
const fs = require('fs');
const path = require('path');
const notesData = require('./db/db.json');
const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('api/notes', (req, res) => { 
    res.json(`${req.method} request received to title and text`);
    console.log(`${req.method} request received to title and text`);
});

app.post('api/notes', (req, res) => {
    
})
app.listen(PORT, () => {
    console.log(`Serving static asset routes on port ${PORT}!`)
});