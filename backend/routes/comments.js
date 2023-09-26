const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments');
const auth = require('../middlewares/auth');

router.get('/:id', auth, commentsCtrl.getArticleComments);
router.post('/:id', auth, commentsCtrl.createComment);
router.delete('/:id', auth, commentsCtrl.deleteComment);

module.exports = router;