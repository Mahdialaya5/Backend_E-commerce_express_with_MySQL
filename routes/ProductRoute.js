const router = require("express").Router();
const isAuth = require("../middlewares/auth");
const productControler = require("../controllers/Product");
const isCompany=require("../middlewares/isCompany")
const upload=require('../utils/multer')

router.get("/",productControler.getProducts);
router.post("/add",isAuth(),isCompany,upload("user").single("file"),productControler.addProduct);
router.put("/:id",isAuth(),isCompany,productControler.updateProduct);
router.delete("/:id",isAuth(),isCompany,productControler.deleteProduct)

module.exports = router;