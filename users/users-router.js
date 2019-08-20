const router = require('express').Router();
const Users = require('./users-model');
const bcrypt = require('bcryptjs');
const restricted = require('../auth/restricted-middleware');

router.get('/users', restricted, (req, res) => {
    Users.getUsers()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: "Error when getting users." }));
});

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 12);

    user.password = hash;

    Users.register(user)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: "Error when registering user." }));
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.login(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ error: "Invalid credentials." })
            }
        })
        .catch(err => res.status(500).json({ error: "Error when logging in." })); 
});

module.exports = router;