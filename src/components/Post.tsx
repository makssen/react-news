import React, { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Box } from '@material-ui/core';
import { IPost } from '../types';
import { formatDistanceStrict } from 'date-fns';
import ru from 'date-fns/locale/ru'
import { postStyles } from '../styles/Post.styles';

export const Post: FC<IPost> = ({ id, userName, header, text, image, time }) => {

    const classes = postStyles();

    const dateDistance = `${time && formatDistanceStrict(new Date(), new Date(time.toDate()), { locale: ru })} назад`;

    return (
        <Card className={classes.root} elevation={3}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar} alt={userName} src={"/broken-image.jpg"} />
                }
                title={userName}
                subheader={dateDistance}
            />
            <CardContent>
                <Box mb={1}>
                    <Typography variant="h6" color="textPrimary">{header}</Typography>
                </Box>
                <Typography variant="body2" color="textPrimary">
                    {text}
                </Typography>
            </CardContent>
            <CardMedia
                className={classes.media}
                image={image}
                title={header}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
