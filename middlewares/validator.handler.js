const boom = require('@hapi/boom');

function validatorHandlerMiddleware (schema, property) {
    //property puede ser body, params, query, etc...
    return (req,res,next) => {
        const data = req[property];
        const {error} = schema.validate(data,{abortEarly:false});
        if(error) {
            next(boom.badRequest(error)) //recibe mensaje o error
        }
        next();
    }
}

module.exports = validatorHandlerMiddleware;
