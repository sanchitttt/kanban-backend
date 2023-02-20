const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Joi = require('joi');


const validate = (schema, obj) => (req, res, next) => {
    try {
        if( !req.is('application/json')){
            res.status(httpStatus.UNSUPPORTED_MEDIA_TYPE).json({"message":"Give a valid JSON body});
        }
        const compiledSchema = Joi.compile(schema);
        if(obj === 'body'){
            const { error } = compiledSchema.validate(req.body);
            console.log(error);
            if (error) {
                res.status(httpStatus.BAD_REQUEST).json(error.message);
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
