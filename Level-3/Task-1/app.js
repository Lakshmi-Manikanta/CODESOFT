require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message || err);
    process.exit(1);
});

// ✅ Models
const User = require('./models/User');


// ✅ Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false
}));

// ✅ Set currentUser for all templates
app.use(async (req, res, next) => {
    res.locals.currentUser = null;
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            res.locals.currentUser = user;
        } catch (err) {
            console.error("User lookup failed");
        }
    }
    next();
});

// ✅ Home Page (Public)
app.get('/', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('author');
    res.render('home', { posts });
});

// ✅ Register
app.get('/register', (req, res) => res.render('register'));

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();
    res.redirect('/login');
});

// ✅ Login
app.get('/login', (req, res) => res.render('login'));

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid credentials');
    }
});

// ✅ Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// ✅ Dashboard
app.get('/dashboard', async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');

    const user = await User.findById(req.session.userId);
    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

    res.render('dashboard', {
        title: 'Dashboard',
        user,
        posts
    });
});

// ✅ Show Create Post Form
app.get('/create', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    res.render('create');
});

// ✅ Handle Post Submission
app.post('/posts/create', async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');

    const { title, content } = req.body;
    try {
        const post = new Post({
            title,
            content,
            author: req.session.userId
        });
        await post.save();
        res.redirect('/dashboard');
    } catch (err) {
        console.error("Post creation failed:", err);
        res.status(500).send("Failed to create post");
    }
});

// ✅ View All Posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 }).populate('author');
        res.render('posts', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading posts");
    }
});

// ✅ View Single Post
const Post = require('./models/Post'); // Make sure path is correct

app.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
