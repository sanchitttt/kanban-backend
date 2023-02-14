const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Joi = require('joi');


const validate = (schema, obj) => (req, res, next) => {
    try {
        if( !req.is('application/json')){
            throw new ApiError(httpStatus.UNSUPPORTED_MEDIA_TYPE, "Give a valid JSON body");
        }
        const compiledSchema = Joi.compile(schema);
        if(obj === 'body'){
            const { error } = compiledSchema.validate(req.body);
            console.log(error);
            if (error) {
                console.log('called')
                throw new ApiError(httpStatus.BAD_REQUEST,error.message);
            }
            else{
                next();
            }
        }
      
    } catch (error) {
        console.log(error)
    }
   
  
}





module.exports = validate;