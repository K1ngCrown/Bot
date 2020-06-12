const fs = require('fs');
const path = require('path');
const Supply = require('./src/supply')

function startTasks() {
    fs.readdir('./settings', (error, files) => {
        if (error) return console.log(err);
        files.forEach((file, index) => {
            const profile = JSON.parse(fs.readFileSync(`./settings/${file}`));
            //console.log(profile);
            new Supply(profile, (index + 1));

        });
    });
}

startTasks();