const mongoose = require('mongoose');

const rssSchema = mongoose.Schema({
    rsslink: {type: String},
    category: {type: String}
});

module.exports = mongoose.model('RSS', rssSchema)