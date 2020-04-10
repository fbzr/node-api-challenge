import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
// crud operations
import projectsCrud from '../crud/projects';


const Projects = ({ projects, addProject, editProject, deleteProject }) => {
    const { push } = useHistory();
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
                    push(`/projects/${data.id}`);
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
        </div>
    )
}

export default Projects;
