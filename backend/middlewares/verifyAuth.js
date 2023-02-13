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

           catchAsync(fetchUser(jwtPayload.userId).then((result) => {
                if (!result) {
                    throw new ApiError(httpStatus.NOT_FOUND);
                }
                else {
                    result.password = null;
                    req.user = result;
                    next();
                }
            }).catch((err) => {
                if (err.statusCode === 404) throw new ApiError(httpStatus.NOT_FOUND)
                else throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
            }))
        }




    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Please login first");
    }

}

module.exports = verifyAuth;
