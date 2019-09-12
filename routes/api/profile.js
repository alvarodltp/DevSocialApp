const express = require('express');
const router = express.Router();

//@route  Get API/posts
//desC    Test route
//@access Public
router.get('/', (req, res) => res.send('Post route'));

module.exports = router;