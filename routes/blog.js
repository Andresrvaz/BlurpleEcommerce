const { application } = require('express');
const express = require('express');

const blogController = require('../controllers/blogC');

const router = express.Router();

router.get('/blog', blogController.getBlogfeed);

module.exports = router;