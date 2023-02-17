const httpStatus = require("http-status");
const bcrypt = require('bcrypt');
const User = require("../models/user.modal");
const ApiError = require("../utils/ApiError");
const Board = require("../models/boards.schema");
const data = require('../data/data.json');

class UserService {
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    async createUser(userBody) {
        try {
            const isEmailTaken = await User.findOne({ email: userBody.email });
            if (isEmailTaken) {
                throw new ApiError(httpStatus.OK, "Email already taken");
            }
            else {
                const hashedPassword = await this.hashPassword(userBody.password);
                const newUser = await User.create({ ...userBody, password: hashedPassword });
                await Board.create({
                    email: userBody.email,
                    boards : []
                })
                return newUser;
            }
        } catch (error) {
            console.log('error = ',error);
            throw error;
        }
    }
}


module.exports = UserService;
