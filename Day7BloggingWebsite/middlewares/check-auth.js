const jwt = require('jsonwebtoken');
const HttpError = require('../utils/http-error');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            const error = new HttpError("Token doesn't exist, Please try later", 403);
            return next(error);
        }
        decodedToken = jwt.verify(token,"userSecretKey");
        req.user = decodedToken;
        next();
    }catch(err){
        const error = new HttpError("Error occured in middleware, Please try later", 403);
        return next(error);
    }
};