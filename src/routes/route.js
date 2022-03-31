const express = require('express');
 const router = express.Router();
const usercontroller = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewsController = require("../controllers/reviewsController")
const middleware = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/user", usercontroller.createUser)
router.post("/login", usercontroller.loginUser)

router.post("/book",middleware.authenticate, middleware.authorise, bookController.createBook)

router.get("/allBooks",middleware.authenticate,  bookController.getBook)

router.get("/allBooks/:bookId",middleware.authenticate,bookController.getBookById)

router.put("/updateBook/:bookId",middleware.authenticate,middleware.authorise, bookController.updateBook)

router.delete("/deleteById/book/:bookId",middleware.authenticate, middleware.authorise, bookController.deleteById)

router.post("/createReview/book/:bookId", reviewsController.createReview)

router.put("/book/:bookId/:reviewId", reviewsController.updateReview)
router.delete("/book/:bookId/:reviewId", reviewsController.deleteReview)
//PUT /books/:bookId/review/:reviewId
//DELETE /books/:bookId/review/:reviewId

module.exports = router;

