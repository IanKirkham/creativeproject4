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

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      avatar: defaultAvatar, 
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

app.listen(3000, () => console.log('Server listening on port 3000!'));
