const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send(' My name Sanchita Sharma .I am part og functionup cohort. This is my first ever api!')
});

module.exports = router;

