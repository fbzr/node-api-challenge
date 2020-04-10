module.exports = (req, res, next) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Missing required field \'name\'' });
    }
    if (!description) {
        return res.status(400).json({ message: 'Missing required field \'description\'' });
    }
    next();
}