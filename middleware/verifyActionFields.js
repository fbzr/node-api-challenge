module.exports = (req, res, next) => {
    const { project_id, description, notes } = req.body;
    if ((!project_id && !req.project.id) || !description || !notes) {
        return res.status(400).json({ message: 'Missing required field' });
    }

    if (description.length > 128) {
        return res.status(500).json({ message: 'Description field has too many characters' });
    }
    next();
}