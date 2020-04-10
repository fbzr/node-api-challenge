const express = require('express');
const router = express.Router();
// db
const projectsDb = require('../../data/helpers/projectModel');
const actionsDb = require('../../data/helpers/actionModel');
//middlewares
const verifyProjectFields = require('../../middleware/verifyProjectFields');
const verifyProjectId = require('../../middleware/verifyProjectId');
const verifyActionFields = require('../../middleware/verifyActionFields');
const verifyActionId = require('../../middleware/verifyActionId');

router.use('/:id', verifyProjectId);

// @route   GET /api/projects
// @desc    Returns an array with all projects
router.get('/', async (req, res, next) => {
    try {
        const projects = await projectsDb.get();
        res.json(projects);
    } catch(err) {
        next(err);
    }
});

// @route   POST /api/projects
// @desc    Add a new project and return the new project obj to the client
router.post('/', verifyProjectFields, async (req, res, next) => {
    try {
        const project = await projectsDb.insert(req.body);
        res.status(201).json(project);
    } catch(err) {
        next(err);
    }
});

// @route   GET /api/projects/:id
// @desc    Return a project specified by the ID param
router.get('/:id', async (req, res, next) => {
    try {
        const project = await projectsDb.get(req.params.id);
        res.json(project);
    } catch(err) {
        next(err);
    }
});

// @route   DELETE /api/projects/:id
// @desc    Deletes a project specified by the ID param
router.delete('/:id', async (req, res, next) => {
    try {
        // req.project is set in the verifyProjectId middleware
        await projectsDb.remove(req.project.id);
        res.json({ message: 'Project successfully deleted' });
    } catch(err) {
        next(err);
    }
});

// @rounte  PUT /api/projects/:id
// @desc    Edit a project specified by the ID param and return the altered project
router.put('/:id', verifyProjectFields, async (req, res, next) => {
    try {
        const updatedProject = await projectsDb.update(req.project.id, req.body);
        res.json(updatedProject);
    } catch(err) {
        next(err);
    }
});

// @route   GET /api/projects/:id/actions
// @desc    Return an array of actions of a project specified by ID parameter
router.get('/:id/actions', async (req, res, next) => {
    try {
        const actions = await projectsDb.getProjectActions(req.project.id);
        res.json(actions);
    } catch(err) {
        next(err);
    }
});

// @route   GET /api/projects/:id/actions/:actionId
// @desc    Return a project's action specified by actionId param
router.get('/:id/actions/:actionId', verifyActionId, async (req, res, next) => {
    try {
        if(req.project.id !== req.action.project_id) {
            return res.status(400).json({ message: 'Action\'s project ID does not match with project selected' });
        }
        res.json(req.action);
    } catch(err) {
        next(err);
    }
});

// @route   POST /api/projects/:id/actions/
// @desc    Add a new action to a project
router.post('/:id/actions/', verifyActionFields, async (req, res, next) => {
    try {
        const action = await actionsDb.insert({
            ...req.body,
            project_id: req.project.id
        });
        res.status(201).json(action);
    } catch(err) {
        next(err);
    }
});

module.exports = router;