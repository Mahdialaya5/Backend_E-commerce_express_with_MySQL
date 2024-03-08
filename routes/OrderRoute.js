const router = require("express").Router();
const isAuth = require("../middlewares/auth");
const orderControler = require("../controllers/Order");

router.post("/",isAuth(),orderControler.newOrder);
module.exports = router;