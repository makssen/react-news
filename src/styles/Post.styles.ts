import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const postStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 700,
            marginBottom: 30
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
        avatar: {
            backgroundColor: red[500],
        }
    }),
);