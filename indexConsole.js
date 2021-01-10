let Parser = require('rss-parser');
let parser = new Parser();
var rl = require('readline');

const mongoose = require('mongoose');

//Map global promise - get rid of warning
mongoose.Promise == global.Promise;
//Connect to db
const db = mongoose.connect('mongodb://localhost:27017/rsscli', {useNewUrlParser: true, useUnifiedTopology: true});

//Import model
const RSS = require('./RSS');

//Add RSS
const addRSS = (rss) => {
    RSS.create(rss).then(rss => {
        console.info('New RSS added');
        mongoose.connection.close();
    });
}
//Find RSS
const findRSS = (name) => {
    //Case insensitive
    const search = new RegExp(name, 'i');
    RSS.find({$or: [{rsslink: search}, {category: search}]})
    .then(rss => {
        console.info(rss);
        console.info(`${rss.length} matches`);
        mongoose.connection.close();
    })
}

const updateRSS = (_id, rss) => {
    RSS.updateOne({ _id }, rss)
    .then(rss => {
        console.info('RSS Updated');
        mongoose.connection.close();
    });
}

const removeRSS = (_id) => {
    RSS.remove({ _id })
    .then(rss => {
        console.info('RSS Removed');
        mongoose.connection.close();
    });
}

const listRSSs = () => {
    RSS.find()
    .then(rss => {
        console.info(rss);
        console.info(`${rss.length} matches`);
        mongoose.connection.close();
    });
}

const parseRSS = (rss) => {
    const search = new RegExp(rss, 'i');
    RSS.find({$or: [{rsslink: search}, {category: search}]})
    .then(rss => {
        
        var rssObject = rss.toObject();
        console.log(rssObject.category);
        console.info(rss);
        console.info(`${rss.length} matches`);
        mongoose.connection.close();
    })
}

/*var prompts = rl.createInterface(process.stdin, process.stdout);
prompts.question("Type in the RSS you want to parse ", function(RSS){

    (async () => {
    
      let feed = await parser.parseURL(RSS);
      console.log(feed.title);
    
      feed.items.forEach(item => {
        console.log(item.title + ':' + item.link)
      });
    
    })();

});*/

//Export methods
module.exports = {
    addRSS,
    findRSS,
    updateRSS,
    removeRSS,
    listRSSs,
    parseRSS
}

