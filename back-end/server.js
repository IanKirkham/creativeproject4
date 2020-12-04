const express = require('express');
const bodyParser = require('body-parser');
const argon2 = require("argon2");

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
  avatar: String,
  posts: Array,
  favorites: Array,
  date_joined: String,
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  replies: Array,
  likes: Number,
  favorite: Boolean,
  date_posted: String,
  author: String,
  author_id: Number,
  category: String,
});

const User = user_db.model('User', userSchema);
const Post = post_db.model('Post', postSchema);

const defaultAvatar = "https://img.icons8.com/ios/100/000000/login-as-user.png";

// Login User
app.post('/api/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: "Username and Password are required"
    });
  }

  try {
    let user = await User.findOne({
      username: req.body.username
    });

    if (!user) {
      return res.status(403).send({
        message: "Invalid Credentials"
      });
    }

    if (user.password != req.body.password) {
      return res.status(403).send({
        message: "Invalid Credentials"
      });
    }

    res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Register User
app.post('/api/register', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: "Username and Password are required"
    });
  }

  try {
    const existingUser = await User.findOne({
      username: req.body.username
    });
    if (existingUser) {
      return res.status(403).send({
        message: "Username already exists"
      });
    }
    let today = new Date();
    const date = today.getMonth()+1 + "/" + today.getDate() + "/" + today.getFullYear();
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      avatar: defaultAvatar,
      posts: [],
      favorites: [],
      date_joined: date,
    });
    await user.save();
    res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get User Profile Data
app.get('/api/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username
    });
    if (!user) {
      return res.status(404).send({
        message: "User profile not found"
      });
    }
    res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get Category Posts
app.get('/api/posts/:category', async (req, res) => {
  try {
    let posts = await Post.find({ category: req.params.category });
    res.send(posts);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get Post from ID
app.get('/api/post/:id', async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.id});
    res.send(post);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Create Post
app.post('/api/create', async (req, res) => {
  try {
    let today = new Date();
    const date = today.getMonth()+1 + "/" + today.getDate() + "/" + today.getFullYear();
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      replies: [],
      likes: 0,
      favorite: false,
      date_posted: date,
      author: req.body.author,
      author_id: req.body.author_id,
      category: "cooking",
    });
    await post.save();
    res.send({
      post: post
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Add Reply to a Post
app.put('/api/reply/:id', async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.id });
    let reply = {
      content: req.body.content,
      author: req.body.author,
      id: Math.floor(Math.random() * 10000) + 1,
    };
    post.replies.push(reply);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
