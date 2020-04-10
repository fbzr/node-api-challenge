import axios from 'axios';

const projectsAxios = axios.create({
    baseURL: 'http://localhost:5000/api/projects'
});

const getAll = async () => {
    try {
        const res = await projectsAxios.get('/');
        return res.data;
    } catch(err) {
        return err;
    }
}

const getById = async id => {
    try {
        const res = await projectsAxios.get(`/${id}`);
        return res.data;
    } catch(err) {
        return err;
    }
}

const addProject = async project => {
    try {
        const res = await projectsAxios.post('/', project);
        return res.data;
    } catch(err) {
        return err;
    }
}

const editProject = async project => {
    try {
        const res = await projectsAxios.put(`/${project.id}`, project);
        return res.data;
    } catch(err) {
        return err;
    }
}

const removeProject = async projectId => {
    try {
        const res = await projectsAxios.delete(`/${projectId}`);
        return res.data;
    } catch(err) {
        return err;
    }
}

const getActions = async projectId => {
    try {
        const res = await projectsAxios.get(`/${projectId}/actions`);
        return res.data;
    } catch(err) {
        return err;
    }
}

const addAction = async (projectId, action) => {
    try {
        const res = await projectsAxios.post(`/${projectId}/actions`, action);
        return res.data;
    } catch(err) {
        return err;
    }
}

export default {
    getAll,
    getById,
    addProject,
    editProject,
    removeProject,
    getActions,
    addAction
}