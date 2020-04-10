import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';
// crud operations
import projectsCrud from '../crud/projects';

const Actions = () => {
    const [project, setProject] = useState({});
    const [actions, setActions] = useState([]);
    const params = useParams();
    
    useEffect(() => {
        (async () => {
            const proj = await projectsCrud.getById(params.id)
            setProject(proj);
            setActions(await projectsCrud.getActions(proj.id));
        })();
    }, [])
    return (
        <>
        <Typography variant='h2'>{project.name}</Typography>
        {actions.map(action => (
            <Card>
                <CardContent>
                    <Typography variant='h5'>{action.description}</Typography>
                    <Typography variant='p'>{action.notes}</Typography>
                </CardContent>
            </Card>
        ))}
        </>
        
    )
}

export default Actions
