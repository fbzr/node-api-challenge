const express = require('express');
const router = express.Router();
const actionsDb = require('../../data/helpers/actionModel');
// middleware
const verifyActionId = require('../../middleware/verifyActionId');
const verifyActionFields = require('../../middleware/verifyActionFields');

router.use('/:actionId', verifyActionId);

// @route   GET /api/actions
// @desc    Returns an array with all the actions
router.get('/', async (req, res, next) => {
    try {
        const actions = await actionsDb.get();
        res.json(actions);
    } catch(err) {
        next(err);
    }
});

// @route   POST /api/actions
// @desc    Add a new action
router.post('/', verifyActionFields, async (req, res, next) => {
    try {
        const action = await actionsDb.insert(req.body);
        res.status(201).json(action);
    } catch(err) {
        next(err);
    }
});

// @route   GET /api/actions/:actionId
// @desc    Returns an actions specified by the ID param
router.get('/:actionId', async (req, res, next) => {
    try {
        res.json(req.action);
    } catch(err) {
        next(err);
    }
});

// @route   DELETE /api/actions/:actionId
// @desc    Removes an action specified by the ID param
router.delete('/:actionId', async (req, res, next) => {
    try {
        await actionsDb.remove(req.params.actionId);
        res.json({ message: 'Action successfully deleted' });
    } catch(err) {
        next(err);
    }
});

// @route   PUT /api/actions/:actionId
// @desc    Deletes an action specified by the ID param
router.put('/:actionId', verifyActionFields, async (req, res, next) => {
    try {
        const action = await actionsDb.update(req.params.actionId, req.body);
        res.json(action);
    } catch(err) {
        next(err);
    }
});

module.exports = router;