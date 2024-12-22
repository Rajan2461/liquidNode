const express = require('express');
const { Liquid } = require('liquidjs');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const engine = new Liquid({
    root: path.resolve(__dirname, 'views'),
    extname: '.liquid'
});
const PORT = 4200;

app.engine('liquid', engine.express());
app.set('views', './views');
app.set('view engine', 'liquid');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const postsFilePath = path.join(__dirname, 'posts.json');

const readPosts = () => {
    return JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
};

const writePosts = (posts) => {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
};

app.get('/', (req, res) => {
    const posts = readPosts();
    res.render('index', { title: 'Home', posts });
});

app.get('/create', (req, res) => {
    res.render('edit', { title: 'Create Post', buttonText: 'Create', actionUrl: '/create' });
});

app.post('/create', (req, res) => {
    const posts = readPosts();
    const newPost = {
        id: posts.length ? posts[posts.length - 1].id + 1 : 1,
        title: req.body.title,
        content: req.body.content,
        color: req.body.color,
        date: new Date().toLocaleDateString(),
    };
    posts.push(newPost);
    writePosts(posts);
    res.redirect('/');
});

app.get('/post/:id', (req, res) => {
    const posts = readPosts();
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    res.render('post', { title: post.title, post });
});

app.get('/edit/:id', (req, res) => {
    const posts = readPosts();
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found')
    res.render('edit', { title: 'Edit Post', post, buttonText: 'Update', actionUrl: '/edit/' + post.id });
});

app.post('/edit/:id', (req, res) => {
    const posts = readPosts();
    const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).send('Post not found');
    posts[postIndex] = {
        id: posts[postIndex].id,
        title: req.body.title,
        content: req.body.content,
        color: req.body.color,
        date: new Date().toLocaleDateString(),
    };
    writePosts(posts);
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    let posts = readPosts();
    posts = posts.filter((p) => p.id !== parseInt(req.params.id));
    writePosts(posts);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
