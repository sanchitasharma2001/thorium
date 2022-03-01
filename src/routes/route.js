const express = require('express');
const router = express.Router();
const bookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post("/createAuthor", bookController.createAuthor )
router.post("/createBook", bookController.createBook )
router.get("/bookList", bookController.createBook  )
router.post("/updateBookPrice",bookController.updateBookPrice)
router.get("/Books",bookController.Books)

module.exports = router;