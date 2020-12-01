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
});

const User = user_db.model('User', userSchema);
const Post = post_db.model('Post', postSchema);

app.get('/', async (req, res) => {
  res.send("Hello World");
});

// add all api calls here

app.listen(3000, () => console.log('Server listening on port 3000!'));

