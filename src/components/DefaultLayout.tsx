import React, { FC } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { IRoutes } from "../types";
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import { CreatePost, Home } from "../pages";
import { defaultLayoutStyles } from '../styles/DefaultLayout.style';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { signOutUser } from '../services/firebase';

const routes: IRoutes[] = [
    {
        label: 'Главная',
        path: '/',
        exact: true,
        icon: <HomeIcon />,
        component: Home
    },
    {
        label: 'Создать пост',
        path: '/create_post',
        exact: true,
        icon: <CreateIcon />,
        component: CreatePost
    }
];

export const DefaultLayout: FC = ({ children }) => {

    const classes = defaultLayoutStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [open, setOpen] = React.useState(true);

    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const { user } = useTypeSelector(state => state.user);

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        React News
                    </Typography>
                    {
                        user ?
                            <IconButton
                                className={classes.leftPanel}
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="user-menu-out"
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar alt={user?.displayName} src={user.photoURL ? user.photoURL : "/broken-image.jpg"} />
                            </IconButton>
                            :
                            <IconButton
                                className={classes.leftPanel}
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="user-menu"
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                    }
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <List>
                    {routes.map((item, i) =>
                        <ListItem onClick={() => history.push(item.path)} button key={i}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    )}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {children}
            </main>
            {
                user ?
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        id="user-menu-out"
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                signOutUser().then(() => history.push('/login'));
                            }
                            }
                        >
                            Выйти
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                history.push('/create_post')
                            }
                            }
                        >
                            Создать пост
                        </MenuItem>
                    </Menu>
                    :
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        id="user-menu"
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                history.push('/login')
                            }
                            }
                        >
                            Войти
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                history.push('/signup')
                            }
                            }
                        >
                            Регистрация
                        </MenuItem>
                    </Menu>}
        </div >
    );
}
