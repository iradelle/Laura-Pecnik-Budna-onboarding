const {logEvents} = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errorLog.txt');
    console.error(err.stack)
    res.status(500).send(err.message);
    // 500 - server error
}

module.exports = errorHandler; 