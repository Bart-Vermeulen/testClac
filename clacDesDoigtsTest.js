const express = require('express');
const app = express();

require('dotenv/config');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION,  (err) => console.log(err));


const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Post = require('./models/posts');

app.get('/chicken', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({ message: err })
    }
    
})

app.post('/chicken', async (req, res) => {
    const post = new Post({
        name: req.body.name,
        birthday: req.body.birthday,
        weight: req.body.weight,
        steps: req.body.steps,
        isRunning: req.body.isRunning,
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({ message: err })
    }
    
})

app.put('/chicken', async (req, res) => {
    const put = new Post({
        name: req.body.name,
        birthday: req.body.birthday,
        weight: req.body.weight,
        steps: req.body.steps,
        isRunning: req.body.isRunning,
    });
    try{
        const savedPut = await put.save();
        res.json(savedPut);
    }catch(err){
        res.json({ message: err })
    }

})

app.patch('/chicken/:chickenName', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne({ name: req.params.chickenName }, { $set: {name: req.body.name}});
        res.json(updatedPost);
    }catch(err){
        res.json({ message: err })
    }
})

app.patch('/chicken/run/:chickenName', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne({ name: req.params.chickenName, isRunning: true }, { $inc: {steps: 1}});
        res.json(updatedPost);
    }catch(err){
        res.json({ message: err })
    }
})

app.delete('/chicken/:chickenName', async (req, res) => {
    try{
        const removedPost = await Post.remove({ name: req.params.chickenName });
        res.json(removedPost);
    }catch(err){
        res.json({ message: err })
    }
})

app.listen(3000, () => console.log("Listening on port 3000..."))