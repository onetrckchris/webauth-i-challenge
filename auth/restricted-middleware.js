module.exports = function restricted(req, res, next) {
    if(req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "You need to log in first, fool." });
    }
}