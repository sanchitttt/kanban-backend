const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/config');
const User = require('../models/user.modal');
const ApiError = require('../utils/ApiError');

const verifyAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        const jwtPayload = jwt.verify(token, TOKEN_SECRET); // throws an error if invalid

        if (jwtPayload) {
            const fetchUser = (id) => {
                return User.findOne({ _id: id });
            }

            fetchUser(jwtPayload.userId).then((result) => {
                result.password = null;
                req.user = result;
                next();
            }).catch(() => {
                res.status(500).end();
            })
        }




    } catch (error) {
        res.status(401).json({"message":"Please login first"})
    }

}

module.exports = verifyAuth;
