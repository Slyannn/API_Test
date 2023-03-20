const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const userController = require('./controllers/user.controller');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'})
require('./config/dbConfig');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

const app = express();

//Utilisation exterieure via Cors
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.bodyParser());
app.use(cookieParser());

//jwt : Verification pour toutes les routes
//app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});
//Affichage des Utilisateurs
app.get('/users', userController.getAllUsers);

//routes
app.use('/api/user', userRoutes);

//app.get('/test', (req, res)=>res.status(200).send('<h1>Bonjourno</h1>'));

//server
app.listen(process.env.PORT, ()=> console.log("serveur en écoute"));
