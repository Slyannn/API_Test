const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;








module.exports.getAllUsers = async(req, res) =>{
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = (req, res) =>{
 
    if(!ObjectID.isValid(req.params.id)) //Verification de l'ID
        return res.status(400).send('ID unknow : ' + req.params.id);

    UserModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('ID Unknown :' + err);
    }).select('-password');
}

