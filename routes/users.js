var express = require('express');
var router = express.Router();
const userController = require('../controller/user');
const Cat = require('../models/category');

router.get('/',userController.getHome);
router.get('/details/:id',userController.getReadMore);
// router.get('/education',userController.getEdu);

router.get('/:category', (req, res, next) => {
    const category = req.params.category;
    userController.getPostsByCategory(req, res, next, category);
});
// router.get('/politics',userController.getpolitics);
// router.get('/world',userController.getworld);
// router.get('/business',userController.getBusiness);
// router.get('/entertainment',userController.getEntertainment);
// router.get('/life',userController.getlife);
// router.get('/tech',userController.getTech);
// router.get('/sports',userController.getSports);

module.exports = router;
