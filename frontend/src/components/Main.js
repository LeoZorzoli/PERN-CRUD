import React from 'react';
import { Grid } from '@material-ui/core';
import Table from './Table';
import NewTurn from './NewTurn';


const Main = () => {

    return (
        <Grid>
            <NewTurn />
            <Table />
        </Grid>

    )
}

export default Main;