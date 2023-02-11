const httpStatus = require('http-status');
const User = require('../models/user.modal');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');

class AuthService {
    async loginWithEmailAndPassword(userBody) {
        const user = await User.findOne({ email: userBody.email });
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "Email isnt registered yet");
        }
        else {
            const passwordMatch = await bcrypt.compare(userBody.password, user.password);
            console.log(passwordMatch)
            if (!passwordMatch) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
            }
            else {
                return user;
            }
        }
    }
}

module.exports = AuthService;