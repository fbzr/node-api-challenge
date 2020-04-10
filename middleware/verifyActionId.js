const actionsDb = require('../data/helpers/actionModel');

module.exports = async (req, res, next) => {
    try {
        const action = await actionsDb.get(req.params.actionId);
        if (!action) {
            return res.status(400).json({ message: 'Invalid action id' });
        }

        req.action = action;
        next();
    } catch(err) {
        next(err);
    }
}