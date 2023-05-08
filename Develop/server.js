const express = require('express');
const fs = require('fs');
const path = require('path');
const notesData = require('./db/db.json');
const PORT = 3001;
const app = express();
const uuid = require('./helpers/uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => { 
    res.json(`${req.method} request received to add a title and text`);
    console.log(`${req.method} request received to add a title and text`);
});


app.post('/api/notes', (req, res) => {
    console.info`${req.method} request received to add title and text`

    const {title, text} = req.body;
    if (title && text){
        const newNotes = {
            title,
            text,
            note_id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if(err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNotes);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4),
                (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    : console.info('You have submitted a new note!')
                );
            };
        });
        
    };
});







app.listen(PORT, () => {
    console.log(`Serving static asset routes on port ${PORT}!`)
});