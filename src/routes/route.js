const express = require('express');
const router = express.Router();

const UserController= require("../controllers/userController")
const ProductController= require("../controllers/productController")
const HeaderMiddleware= require("../middleware/headerMiddleware")
const OrderController= require("../controllers/orderController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


 router.post("/createUser",HeaderMiddleware.headerValidation,UserController.createUser)

router.post("/createProduct", ProductController.createProduct)

router.post("/createOrder", HeaderMiddleware.headerValidation, OrderController.createOrder)

module.exports = router;