const model = require ('../models/index');

//Requête GET ciblée
exports.getArticleComments = (req, res, next) => {
    model.Comment.findAll({where: {ArticleId: req.params.id}, order:[['id','DESC']]})
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(404).json({error}));
};

//Requête POST
exports.createComment = (req, res, next) => {
    model.Comment.create({...req.body})    
        .then(() => res.status(201).json({message: "Nouveau commentaire ajouté"}))
        .catch(error => res.status(400).json({error}));
};

//Requête DELETE
exports.deleteComment = (req, res, next) => {
    model.Comment.destroy({where: {id: req.body.commentId}})
        .then(() => res.status(200).json({message: 'Commentaire supprimé'}))  
        .catch(error => res.status(400).json({error}));

}