const fsPromises = require('fs').promises;
const path = require('path');

const flieOps = async () => {
    try {
        // read content from starter.txt
        const data = await fsPromises.readFile(path.join(__dirname, 'starter.txt'), 'utf8');
        console.log(data);
        // delete starter.txt
        await fsPromises.unlink(path.join(__dirname, 'starter.txt'));
        // create file promiseWrite.txt and write content of starter.txt in it
        await fsPromises.writeFile(path.join(__dirname, 'promiseWrite.txt'), data);
        // append new content to content of promiseWrite.txt
        await fsPromises.appendFile(path.join(__dirname, 'promiseWrite.txt'), '\nNice to meet you.');
        // rename promiseWrite.txt to promiseRenamed.txt
        await fsPromises.rename(path.join(__dirname, 'promiseWrite.txt'), path.join(__dirname, 'promiseRenamed.txt'));
        // read content from promiseReanamed.txt
        const newData = await fsPromises.readFile(path.join(__dirname, 'promiseRenamed.txt'), 'utf8');
        console.log(newData);
    } catch (err) {
        console.error(err);
    }
}

flieOps();


// const {readFile, readFileSync} = require('fs');

// try {
//     const data = readFileSync("starter.txt", "utf8");
//     console.log(data);
// } catch (err) {
//     console.error(err);
// }

// readFileSync('./starter.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// console.log('test');

// exit on uncaught error
// process.on('uncaughtException', err => {
//     console.error(`There was an uncaught error; ${err}`);
//     process.exit(1); // exit the application
// });