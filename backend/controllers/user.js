const model = require ('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {base64encode, base64decode} = require('nodejs-base64');

// Requête GET générale
exports.getAllUsers = (req, res, next) => {
    model.User.findAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error}));
}

//Requête POST SignUp
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            model.User.create({username: req.body.username, email: base64encode(req.body.email), password: hash})    
                .then(() => res.status(201).json({message: "Nouvel utilisateur créé"}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

//Requête POST Login
exports.login = (req, res, next) => {
    model.User.findOne({where: {email: base64encode(req.body.email)}})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: "Utilisateur inexistant"})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(validity => {
                    if (validity == false) {
                        return res.status(401).json({error:"Mot de passe incorrect"});
                    }
                    res.status(200).json({
                        Username: user.username,
                        UserId: user.id,
                        token: jwt.sign(
                            {UserId: user.id},
                            `${process.env.TOKEN}`,
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));    
};

//Requête DELETE
exports.deleteUser = (req, res, next) => {
    model.User.destroy({where: {id: req.body.UserId}})
        .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))  
        .catch(error => res.status(400).json({error}));
};