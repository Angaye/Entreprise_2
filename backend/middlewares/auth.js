const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, `${process.env.TOKEN}`);
        const UserId = decodeToken.UserId;
        if (req.body.UserId && parseInt(req.body.UserId) !== UserId) {
            throw 'User ID non valable';
        } else {
            next();
        } 
    } catch (error) {
        res.status(401).json({error: error | 'Requête non identifiée'});
    }
};