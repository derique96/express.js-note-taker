const express = require("express");
const fs = require("fs");
const path = require("path");
const notesData = require("./db/db.json");
const PORT = process.env.PORT || 3001;
const app = express();
const uuid = require("./helpers/uuid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  console.info`${req.method} request received to add title and text`;

  const { title, text } = req.body;
  if (title && text) {
    const newNotes = {
      id: uuid(),
      title,
      text,
    };

    fs.readFile("./db/db.json", (err, data) => {
      const parsedNotes = JSON.parse(data);
      parsedNotes.push(newNotes);

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : res.json(newNotes)
      );
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () => {
  console.log(`Serving static asset routes on port ${PORT}!`);
});
