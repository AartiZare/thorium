const express = require('express');
const router = express.Router();
const AuthorController = require("../controllers/authorController");
const BlogController = require("../controllers/blogController")
router.post("/createAuthor", AuthorController.createAuthor)

router.post("/createBlog", BlogController.createBlog)

router.get("/getBlogs", BlogController.getBlogs)
router.put("/updateBlogs/:blogId", BlogController.updateBlogs)
router.delete("/deletedById/:blogId", BlogController.deleteById)
router.delete("/deleteByParams", BlogController.deleteByParams)
module.exports = router;