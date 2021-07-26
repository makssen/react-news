import React, { FC } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { globalStyles } from '../styles/Global.style';

export const Progress: FC = () => {

    const classes = globalStyles();

    return (
        <Grid className={classes.progress} container alignItems="center" justifyContent="center">
            <CircularProgress />
        </Grid>
    );
}
