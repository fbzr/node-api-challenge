const express = require('express');
const router = express.Router();
const actionsDb = require('../../data/helpers/actionModel');
// middleware
const verifyActionId = require('../../middleware/verifyActionId');
const verifyActionFields = require('../../middleware/verifyActionFields');

router.use('/:actionId', verifyActionId);


module.exports = router;