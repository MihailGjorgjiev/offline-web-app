const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const NOTES_DATA_FILE = path.join(__dirname, 'notesList.json');
const app = express();

app.set('port', 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
 
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080') //REPLACE LOCALHOST WITH NETLIFY URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization, x-requested-with')
  next();
});

app.get('/api/notes', (req, res) => {
  fs.readFile(NOTES_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile(NOTES_DATA_FILE, (err, data) => {
    const noteList = JSON.parse(data);
    const newId=noteList[noteList.length-1]?noteList[noteList.length-1].id:0;
    const newNote = { id: newId+1, title: req.body.title, description: req.body.description,timeCreated:req.body.timeCreated};
    let noteExists = false;
    noteList.map((note) => {
      if (note.id === newNote.id) {
        noteExists = true;
      }
    });
    if (!noteExists) noteList.push(newNote);
    fs.writeFile(NOTES_DATA_FILE, JSON.stringify(noteList, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(noteList);
    });
  });
  console.log('A note has been added.');
});

app.put('/api/notes',(req,res)=>{
  fs.readFile(NOTES_DATA_FILE, (err, data) => {
    const noteList = JSON.parse(data);
    const newNote = { id: req.body.id, title: req.body.title, description: req.body.description,timeCreated:req.body.timeCreated};
    noteList.map((note) => {
      if (note.id === newNote.id) {
        note.title=newNote.title;
        note.description=newNote.description;
      }
    });
    fs.writeFile(NOTES_DATA_FILE, JSON.stringify(noteList, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(noteList);
    });
  });
  console.log("A note has been changed.");
})
app.delete('/api/notes/:id', (req, res) => {
  fs.readFile(NOTES_DATA_FILE, (err, data) => {
    const noteList = JSON.parse(data);
    const deleteId=req.params.id;
    const newNoteList=noteList.filter(obj=>obj.id!=deleteId);
    fs.writeFile(NOTES_DATA_FILE, JSON.stringify(newNoteList, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(newNoteList);
    });
  });
  console.log("A note has been deleted.");
});
app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
  });
  