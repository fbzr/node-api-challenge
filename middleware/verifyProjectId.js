const projectsDb = require('../data/helpers/projectModel');

module.exports = async (req, res, next) => {
    try {
        const project = await projectsDb.get(req.params.id);
        if (!project) {
            return res.status(400).json({ message: 'Invalid project id' });
        }
        
        req.project = project;
        next();
    } catch(err) {
        next(err);
    }
}