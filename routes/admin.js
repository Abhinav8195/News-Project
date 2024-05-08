var express = require('express');
var router = express.Router();
const adminController =require('../controller/admin') ;
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
 
    if (file.mimetype.startsWith('image/png') || file.mimetype.startsWith('image/jpeg')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only PNG, JPEG, and JPG images are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 
    },
    fileFilter: fileFilter
});
router.get('/',adminController.getPost);
router.get('/catagory',adminController.getCatagory);
router.get('/add-catagory',adminController.getAddCatagory);
router.get('/edit-catagory/:id',adminController.getEditCatagory);
router.post('/edit-category/:id',adminController.postEditCatagory);
router.post('/add-category',adminController.postAddCategory);
router.post('/delete-category/:id',adminController.postDeleteC);
//TAGS
router.get('/tag',adminController.gettag);
router.get('/add-tag',adminController.getAddtag);
router.get('/edit-tag/:id',adminController.getEdittag);
router.post('/edit-tag/:id',adminController.postEdittag);
router.post('/add-tag',adminController.postAddtag);
router.post('/tag-delete/:id',adminController.postDelte);
//Posts
router.get('/addnews',adminController.getAddNews);
router.get('/post-details/:id',adminController.getPostDetails)
router.post('/addnews',upload.single('image'),adminController.postAddnews);
// router.get('/edit',adminController.getEditPage);
router.get('/update/:id',adminController.getUpdateInfoPage);
router.post('/updateinfo/:id',upload.single('image'),adminController.postUpdate);
router.post('/delete/:id',adminController.postDelete);
router.post('/publish/:id',adminController.postPublish);

router.get('/categories', adminController.getCategories);

//REGISTER USER
router.post('/reg-user',adminController.postREgister);
router.get('/reg-user',adminController.getRegs);
router.get('/add-user',adminController.getAddUser);
router.post('/deleter/:id',adminController.postDeletereg)
//draft
// router.get('/draft',adminController.getDraft);
// router.post('/delete-draft/:id',adminController.postDeleteDraft);
// router.get('/update-draft/:id',adminController.getDraftinfo);
// router.post('/updatedraft/:id',upload.single('image'),adminController.postUpdatedraft);
// router.post('/publishdraft',upload.single('image'),adminController.postpublishdraft);



module.exports = router;