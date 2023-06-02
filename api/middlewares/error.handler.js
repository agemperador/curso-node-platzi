function logErrorsMiddleware (err,req,res,next) {
    console.log("logErrorsMiddleware");
    console.log(err);
    next(err);
}

function errorHandlerMiddleware (err,req,res,next) {
    console.log("errorHandlerMiddleware");
    console.log(err);
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}

function boomErrorHandlerMiddleware (err,req,res,next) {
    if (err.isBoom){
        const {output} = err;
        res.status(output.statusCode).json(output.payload)
    } else {
        next (err)
    }
}




module.exports = {logErrorsMiddleware, errorHandlerMiddleware, boomErrorHandlerMiddleware};
