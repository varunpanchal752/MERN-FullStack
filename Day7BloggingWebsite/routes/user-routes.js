const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const checkAuth = require('../middlewares/check-auth');

router.post("/signup",  userController.userSignup);
router.post("/login", userController.userLogin);
router.get("/getBlog", userController.getBlog);

router.use(checkAuth);

router.get("/getUser", userController.getUser);
router.post("/postBlog", userController.postBlog);

module.exports = router;