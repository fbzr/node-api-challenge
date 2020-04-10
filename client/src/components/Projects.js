import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
// crud operations
import projectsCrud from '../crud/projects';
// components
import Actions from '../components/Actions';

const Projects = ({ projects, addProject, editProject, deleteProject }) => {
    const [actions, setActions] = useState([]);
    const [table, setTable] = useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Description', field: 'description' },
            { title: 'Completed', field: 'completed', type: 'boolean' }
        ],
        data: projects
    });

    useEffect(() => {
        setTable({
            ...table,
            data: projects
        });
    }, [projects]);

    return (
        <div>
            <MaterialTable
                title='Projects'
                columns={table.columns}
                data={table.data}
                onRowClick={async (e, data) => {
                    const actions = await projectsCrud.getActions(data.id);
                    setActions(actions);
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                addProject(newData);
                        }, 600);
                    }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    editProject(newData);
                                    // handleEditPrice(oldData, newData);
                                }
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                deleteProject(oldData.id);
                            }, 600);
                        })
                }}
            />
            <Actions actions={actions} />
        </div>
    )
}

export default Projects;
