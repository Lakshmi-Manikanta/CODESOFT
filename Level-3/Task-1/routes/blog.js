// routes/blog.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const isAuthenticated = require('../middleware/auth');

// View all posts
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('author').sort({ createdAt: -1 });
    res.render('home', { posts });
});

// Create a post
router.get('/create', isAuthenticated, (req, res) => {
    res.render('create');
});

router.post('/create', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({
        title,
        content,
        author: req.session.userId
    });
    await newPost.save();
    res.redirect('/');
});

// View single post
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author');
    res.render('post', { post });
});

module.exports = router;
