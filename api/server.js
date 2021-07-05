const express = require('express');
const userRouter = require('../users/users-router');
const session = require('express-session');

const server = express();

const sessionConfig = {
    name: 'chrissession', // This is defaulted to 'sid'
    secret: 'this is a secret, shhh', 
    cookie: {
        maxAge: 1000 * 30, // This is in miliseconds. So for this example the cookie would be valid for 30 seconds.
        secure: false, // This is asking if it's alright that we send the cookie over an unencrypted connection AKA HTTP. It's only okay for this to be initialized to false during production.
        httpOnly: true, // This means no JS code on the client will ever get access to the cookies.
    },
    resave: false, // Do we want to recreate a session even if it hasn't changed?
    saveUninitialized: false // Again, it's okay to initialize this as false for development. In production, we'll only switch this to true after receiving the okay from the client to save cookies on the browser.
}

server.use(express.json()); // This always has to come before your routers.
server.use(session(sessionConfig))

server.use('/api', userRouter);

module.exports = server;