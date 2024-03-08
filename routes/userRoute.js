const router = require("express").Router();
const isAuth = require("../middlewares/auth");
const userControler = require("../controllers/user");
const isAdmin=require("../middlewares/isAdmin")
const { registerCheck, loginCheck, validator } = require('../middlewares/validator')
const upload=require('../utils/multer')

router.post("/register",upload("user").single("file"),registerCheck(),validator,userControler.register);
router.post("/login",loginCheck(),validator,userControler.login);
router.get("/current",isAuth(),userControler.verify);
router.get("/admin" ,isAuth(),isAdmin,userControler.getUser)

module.exports = router;