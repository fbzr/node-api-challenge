import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
// crud operations
import projectsCrud from './crud/projects';
// components
import Projects from './components/Projects';
import Actions from './components/Actions';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const projects = await projectsCrud.getAll();
      setProjects(projects);
    })();
  }, []);

  const addProject = async project => {
    const newProject = await projectsCrud.addProject(project);
    setProjects([
      ...projects,
      newProject
    ]);
  }

  const editProject = async project => {
    const updatedProject = await projectsCrud.editProject(project);
    setProjects(projects.map(item => item.id === updatedProject ? updatedProject : item));
  }

  const deleteProject = async projectId => {
    await projectsCrud.removeProject(projectId);
    setProjects(projects.filter(item => item.id !== projectId));
  }

  return (
    <>
      <Route exact path='/'>
        <Projects 
          projects={projects}
          addProject={addProject}
          editProject={editProject}
          deleteProject={deleteProject}
        />
      </Route>
      <Route exact path='/projects/:id'>
        <Actions />
      </Route>
    </>
  );
}

export default App;
