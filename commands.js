#!/usr/bin/env node

const program = require('commander');
const {prompt} = require('inquirer');
const { node } = require('webpack');
const {
    addRSS,
    findRSS,
    updateRSS,
    removeRSS,
    listRSSs,
    parseRSS
} = require('./indexConsole');

//RSS questions
const questions = [
    {
        type: 'input',
        name: 'rsslink',
        message: 'RSS link'
    },
    {
        type: 'input',
        name: 'category',
        message: 'RSS category'
    }
];

program
    .version('1.0.0')
    .description('RSS CLI')

// program
// .command('add <rsslink> <category>')
// .alias('a')
// .description('Add an RSS')
// .action((rsslink, category) => {
//     addRSS({rsslink, category});
// });

program
    .command('add')
    .alias('a')
    .description('Add an RSS')
    .action(() => {
        prompt(questions).then(answers => addRSS(answers));
});

program
    .command('find <rss>')
    .alias('f')
    .description('Find an RSS')
    .action(rss => findRSS(rss));

program
    .command('update <_id>')
    .alias('u')
    .description('Update an RSS')
    .action((_id) => {
        prompt(questions).then(answers => updateRSS(_id, answers));
});

program
    .command('remove <_id>')
    .alias('r')
    .description('Remove an RSS')
    .action(_id => removeRSS(_id));

program
    .command('list')
    .alias('r')
    .description('List every RSS')
    .action(() => listRSSs());

program
    .command('parse <rss>')
    .alias('p')
    .description('Parse an RSS')
    .action(rss => parseRSS(rss));

program.parse(process.argv);