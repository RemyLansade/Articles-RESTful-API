const mongoose = require('mongoose');

const articlesSchema = mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model('Article', articlesSchema);

module.exports = Article;