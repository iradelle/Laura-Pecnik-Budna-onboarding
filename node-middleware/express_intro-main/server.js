const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('../express_intro-main/middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// cors: cross origin resource sharing
// list that is allowed to access backend
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin /*  v development modu, za undefined*/ ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
// app.use(cors()); // open to the public

// built-in middleware
// handling form data
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static files (like html)
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));



// // Route handlers
// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('attempted to load hello.html');
//     next()
// }, (req, res) => {
//     res.send('Hello World!');
// });


// // chaining route handlers
// const one = (req, res, next) => {
//     console.log('one');
//     next();
// }

// const two = (req, res, next) => {
//     console.log('two');
//     next();
// }

// const three = (req, res) => {
//     console.log('three');
//     res.send('Finished!');
// }

// app.get('/chain(.html)?', [one, two, three]);


// app.use('/') -> for middleware
// everything that made it here should get error -> app.all -> for routing
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({error: "404 not found"});
    }
    else {
        res.type('txt').send("404 not found");
    }
    
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));