const express = require('express');
const router = express.Router();

const Article = require('../models/articlemodel');


router.get('/', (req, res) => {
    Article.find({}, (err, results) => {
        if (err){
            res.send(err);
        }
        res.send(results);
    });
});

router.post('/', (req, res) => {
    const {title, content} = req.body;
    
    const newArticle = new Article({
        title: title,
        content: content
    });
    
    newArticle.save((err) => {
        if (err) {
            res.json(err);
        }
        res.send("Successfully added new article");
    });
});

router.delete('/', (req, res) => {
    Article.deleteMany((err) => {
        if (err) {
            res.json(err)
        }
        res.send("Succesfully delete all articles");
    });
});

//---------------------------------------------------------------------------------//

router.get('/:articleTitle', (req, res) => {
    const title = req.params.articleTitle;
    Article.findOne({title: title}, (err, result) => {
        if(!err) {
            if(result){
                res.send(result);
            } else {
                res.send(`No article matched with "${title}". Try another title.`);
            }
        } else {
            res.sendStatus(500);
        }
    });
});

router.put('/:articleTitle', (req, res) => {
    Article.update(
        {title: req.params.articleTitle}, 
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        (err, result) => {
            if(!err){
                if(result){
                    res.send(`"${req.params.articleTitle}" article successfully update.`)
                } else {
                    res.send(`No article with title "${req.params.articleTitle}" found. Try another title.`);
                }
            } else {
                res.sendStatus(404);
            }
        }
    );
});

router.patch('/:articleTitle', (req, res) => {
    Article.update(
        {title: req.params.articleTitle}, 
        {$set: req.body},
        (err, result) => {
            if(!err){
                if(result){
                    res.send(`"${req.params.articleTitle}" article successfully update.`)
                } else {
                    res.send(`No article with title "${req.params.articleTitle}" found. Try another title.`);
                }
            } else {
                res.sendStatus(404);
            }
        }
    );
});

router.delete('/:articleTitle', (req, res) => {
    const title = req.params.articleTitle;
    Article.deleteOne({title: title}, (err, result) => {
        if(!err) {
            if(result){
                res.send(`Successfully deleted the article with title "${title}"`);
            } else {
                res.send(`No article matched with "${title}". Try another title.`);
            }
        } else {
            res.sendStatus(500);
        }
    });
});

module.exports = router;