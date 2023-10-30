const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require ('helmet');
const mySql = require("mysql")
require('dotenv').config();
const articlesRoutes = require('./routes/articles');
const userRoutes = require('./routes/user');
const commentsRoutes = require('./routes/comments');

const Sequelize = require("sequelize")

//Configuration du limiteur de requêtes
const limiter = rateLimit ({
    windowMs: 10*60*1000, // 10 minutes (en ms) - temps de blocage
    max: 10 // nombre de requêtes autorisées
});

//Création de l'application Express
const app = express();

//Configuration des entêtes, format de données & sécurité
app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());

//Connexion à la BD mySql
// const connexion = mySql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'entreprise2_bd'
// })

// connexion.connect((err) =>{
//     if(err){
//         console.error("Erreur de connexion" + err.stack);
//         return
//     }
//     console.log("Connection reusite!")
// })

const connexion = new Sequelize('entreprise2_bd', 'root', 'root',{
    dialect : 'mysql', host: 'localhost'
});

connexion.authenticate()
.then(console.log("Connexion reussi"))
.catch((error) =>console.log("Echec de connection" + error))



//Configuration des routeurs
app.use('/api/articles', articlesRoutes);
app.use('/api/auth', limiter, userRoutes);
app.use('/api/comments', commentsRoutes);

//Export
module.exports = app;