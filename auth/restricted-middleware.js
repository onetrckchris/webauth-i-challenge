const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

module.exports = function restricted(req, res, next) {
    const { username, password } = req.headers;

    if(username && password) {
        Users.login(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                next();
            } else {
                res.status(401).json({ error: "Invalid credentials." })
            }
        })
        .catch(err => res.status(500).json({ error: "Error when logging in." }));
    } else {
        res.status(400).json({ message: "Invalid credentials." });
    }
}