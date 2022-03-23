const express = require('express');
const router = express.Router();
const collegeController= require("../controllers/collegeController")
const internController= require("../controllers/internController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/college", collegeController.createCollege)

router.post("/intern", internController.createIntern)

router.get("/collegeDetails", collegeController.collegeDetail)

module.exports = router;