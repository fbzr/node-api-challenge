import React, { useState, useEffect } from 'react';
// crud operations
import projectsCrud from './crud/projects';
// components
import Projects from './components/Projects';

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
      <Projects 
        projects={projects}
        addProject={addProject}
        editProject={editProject}
        deleteProject={deleteProject}
      />
    </>
  );
}

export default App;
