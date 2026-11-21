const express = require('express');
const router = express.Router();
const { getSampleConversations, getSampleById } = require('../controllers/samplesController');

router.get('/', getSampleConversations);
router.get('/:id', getSampleById);

module.exports = router;
