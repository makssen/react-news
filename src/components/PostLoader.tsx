import { Skeleton } from '@material-ui/lab';
import React, { FC } from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Box } from '@material-ui/core';
import { postStyles } from '../styles/Post.styles';



export const PostLoader: FC = () => {

    const classes = postStyles();

    return (
        <Card className={classes.root} elevation={3}>
            <CardHeader
                avatar={
                    <Skeleton width={40} height={40} variant="circle" />
                }
                title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
                subheader={<Skeleton animation="wave" height={10} width="40%" />}
            />
            <CardContent>
                <Box mb={1}>
                    <Skeleton height={10} width="100%" />
                </Box>
                <Skeleton height={30} width="100%" />
            </CardContent>
            <Skeleton className={classes.media} />
        </Card>
    );
}
