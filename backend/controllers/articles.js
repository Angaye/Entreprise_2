const model = require ('../models/index');

// Requête GET générale
exports.getAllArticles = (req, res, next) => {
    model.Article.findAll({order:[['id','DESC']]})
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({error}));
};

//Requête GET ciblée
exports.getOneArticle = (req, res, next) => {
    model.Article.findOne({where: {id: req.params.id}})
        .then(article => res.status(200).json(article))
        .catch(error => res.status(404).json({error}));
};

//Requête POST article
exports.createArticle = (req, res, next) => {
    model.Article.create({...req.body})    
        .then(() => res.status(201).json({message: "Nouvel article créé"}))
        .catch(error => res.status(400).json({error}));
};

//Requête PUT
exports.updateArticle = (req, res, next) => {
    model.Article.update({...req.body},{where: {id: req.params.id}})
        .then(() => res.status(200).json({message: 'Article modifié'}))
        .catch(error => res.status(400).json({error}));
};

//Requête DELETE
exports.deleteArticle = (req, res, next) => {
    model.Article.destroy({where: {id: req.params.id}})
        .then(() => res.status(200).json({message: 'Article supprimé'}))  
        .catch(error => res.status(400).json({error}));
};