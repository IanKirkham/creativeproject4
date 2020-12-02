const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

var user_db = mongoose.createConnection('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var post_db = mongoose.createConnection('mongodb://localhost:27017/posts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const postSchema = new mongoose.Schema({
  content: String,
  replies: Array,
  likes: Number,
  favorite: Boolean,
  date_posted: String,
  author: String,
  author_id: Number,
});

const User = user_db.model('User', userSchema);
const Post = post_db.model('Post', postSchema);

// Create
app.post('/api/', async (req, res) => {
  try {
    res.send("Create Placeholder");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Read
app.get('/api/', async (req, res) => {
  try {
    res.send("Read Placeholder");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Update
app.put('/api/', async (req, res) => {
  try {
    res.send("Update Placeholder");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete
app.delete('/api/', async (req, res) => {
  try {
    res.send("Delete Placeholder");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
