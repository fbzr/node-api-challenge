import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const Actions = ({ actions }) => {
    return (
        actions.map(action => 
            <Card key={action.id}>
                <CardContent>
                    <Typography variant='h5'>{action.description}</Typography>
                    <Typography variant='p'>{action.notes}</Typography>
                </CardContent>
            </Card>
        )
    )
}

export default Actions
