const express = require('express');
const router = express.Router();
const { getTactics, getTacticById } = require('../controllers/tacticsController');

router.get('/', getTactics);
router.get('/:id', getTacticById);

module.exports = router;
