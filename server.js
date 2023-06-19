const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const MongoClient = mongodb.MongoClient;
let db;

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    if (err) throw err;
    db = client.db('photographyDB');
});

// GET all photos
app.get('/api/photos', (req, res) => {
    db.collection('photos').find({}).toArray((err, docs) => {
        if(err) throw err;
        res.json(docs);
    });
});

// GET a photo by ID
app.get('/api/photos/:id', (req, res) => {
    const id = req.params.id;
    db.collection('photos').findOne({_id: new mongodb.ObjectID(id)}, (err, doc) => {
        if(err) throw err;
        res.json(doc);
    });
});

// POST a new photo
app.post('/api/photos', (req, res) => {
    const photo = req.body;
    db.collection('photos').insertOne(photo, (err, result) => {
        if(err) throw err;
        res.json(result.ops[0]);
    });
});

// PUT (update) a photo
app.put('/api/photos/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    db.collection('photos').updateOne({_id: new mongodb.ObjectID(id)}, {$set: updates}, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

// DELETE a photo
app.delete('/api/photos/:id', (req, res) => {
    const id = req.params.id;
    db.collection('photos').deleteOne({_id: new mongodb.ObjectID(id)}, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

app.listen(3000, () => console.log('App listening on port 3000'));



