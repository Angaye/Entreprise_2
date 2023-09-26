const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articles');
const auth = require('../middlewares/auth');

router.get('/', auth, articlesCtrl.getAllArticles);
router.get('/:id', auth, articlesCtrl.getOneArticle);
router.post('/', auth, articlesCtrl.createArticle);
router.put('/modify/:id', auth, articlesCtrl.updateArticle);
router.delete('/:id', auth, articlesCtrl.deleteArticle);

module.exports = router;