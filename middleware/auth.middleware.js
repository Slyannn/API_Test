const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');




module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(req);
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1});
                next();
            }
            else{
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);
                next();
            }
        })
    } else {
        res.locals.user = null;
        console.log('Pas connecté parceque pas de Token');
        next();
    }
}

module.exports.requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err) {
                console.log("Pb d'authentification" + err);
            }

            else{
                console.log(decodedToken.id);
                next();
            }
        });
    }
    else {
        console.log("No Token");
    }
}