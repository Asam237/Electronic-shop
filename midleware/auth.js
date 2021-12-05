const jwt = require('jsonwebtoken');
const User = require('../models/User');




module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    // decode the token using a secret key-phrase
    return jwt.verify(token, '123456', (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) { return res.status(401).end(); }

        const userId = decoded.userId;

        // check if a user exists
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                console.log(userErr)
                return res.status(401).end();
            }
            // pass user details onto next route
            req.user = user
            return next();
        });
    });
};