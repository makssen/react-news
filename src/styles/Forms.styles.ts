import { makeStyles } from '@material-ui/core/styles';

export const formsStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: 'none',
        color: '#3f51b5'
    },
    icon: {
        fontSize: 20
    },
    iconButton: {
        margin: theme.spacing(0, 0, 2, 0)
    }
}));