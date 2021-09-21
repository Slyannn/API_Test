module.exports.signUpErrors = (err) => {
    let errors = { username: '', email: '', password:''}

    if(err.message.includes('username'))
        errors.username = "Username Incorrect ou déjà existant";

    if(err.message.includes('email'))
        errors.email = "Email Incorrect";
    
    if(err.message.includes('password'))
        errors.password = "Le Password doit avoir minimum 4 caractères";

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('username'))
        errors.username = "Username déjà utilisé";

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "Email déjà utilisé";
    
    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = {username:'', password:''};
    
    if(err.message.includes("username"))
    errors.username = "Username incorrect ou inconnu";
    
    if(err.message.includes("password"))
        errors.password = "Mot de Passe Incorrect";


    return errors;

}