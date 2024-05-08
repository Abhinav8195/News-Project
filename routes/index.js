var express = require('express');
var router = express.Router();
const IndexController=require('../controller/index')

/* GET home page. */
router.get('/',IndexController.getLogin);
router.post('/login',IndexController.postLogin);
router.get('/logout',IndexController.getLogout);
module.exports = router;
