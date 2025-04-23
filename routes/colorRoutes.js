const express = require('express');
const router = express.Router();
const { updateColor } = require('../controllers/colorControllers');

router.post('/update', updateColor);

module.exports = router;
