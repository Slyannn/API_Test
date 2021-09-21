const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail} = require('validator');

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        email:{
            type: String,
            required:false,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true
        },
        password:{
            type: String,
            minlength: 4,
            maxlength: 1024,
            required: true
        }
    },
    {
        timestamps: true
    },
    { collection: 'users'}
    );


//Crypte le mot de passe avant même de créer l'utilisateur dans la base de données
UserSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function(username, password){
    const user = await this.findOne({username});
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
    if (auth){
        return user;
    }
    throw Error('incorrect password');
    }
    throw Error('incorrect username');
};

const UserModel = mongoose.model("user", UserSchema);


module.exports = UserModel;