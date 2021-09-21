const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: 1 * maxAge
    })
};


//Inscription et creation des utilisateurs
module.exports.signUp = async(req, res) =>{
    //console.log(req.body);
    const {username, email, password} = req.body;

    try{
        const user = await UserModel.create({username, email, password});
        res.status(201).json({user: user._id});
    }
    catch(err){
        const error = signUpErrors(err);
        res.status(200).send({error});
    }
}

module.exports.signIn = async(req, res) => {
    const {username, password} = req.body;

    try{
        const user = await UserModel.login(username, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge});
        res.status(200).json({user: user._id});
    }
    catch(err){
        console.log("Erreur authentification" + err);
        let error = signInErrors(err);
        res.status(200).json(error);
    }
}

module.exports.logOut = (req, res) => {
    res.cookie('jwt', '',{maxAge: 1});
    res.redirect('/');
}





