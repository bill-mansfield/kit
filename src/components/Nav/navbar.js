import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import themeContext from '../../hooks/themeContext';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo_transparent.png';
import Firebase from '../../services/Firebase';
import Switch from '@material-ui/core/Switch';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        width: '80px',
        [theme.breakpoints.up('md')]: {
            width: '120px',
        },
        marginTop: '15px',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '7vh',
        [theme.breakpoints.up('md')]: {
            height: '9vh',
        },
    },
    menuItem: {
        width: '15vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            width: '150px',
        },
        '& > a': {
            textDecoration: 'none',
        },
    },
    menuList: {
        display: 'none',
        flexDirection: 'row',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    hamburger: {
        width: '50px',
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    menuDrawer: {
        '& > :nth-of-type(3)': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    logoutButton: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.up('sm')]: {
            width: '25%',
            height: '60%',
            marginTop: 'auto',
            marginBottom: 'auto',
        },
        mobileList: {},
    },
}));

export default function Navbar(props, theme) {
    const classes = useStyles();
    const { dispatch } = useContext(themeContext);
    const handleChange = () => {
        dispatch({ type: 'TOGGLE_DARK_MODE' });
    };

    const [state, setState] = React.useState({
        right: false,
    });

    const menuArr = ['ascents'];

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logoutButton = (
        <Button
            className={classes.logoutButton}
            onClick={logout}
            href="/"
            variant="contained"
            color="secondary"
        >
            logout
        </Button>
    );

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                {menuArr.map((text, index) => (
                    <ListItem button key={text}>
                        <a style={{ textDecoration: 'none' }} href={text}>
                            <ListItemText primary={text} />
                        </a>
                    </ListItem>
                ))}
                {logoutButton}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar className={classes.header} position="static">
                <a href="/dashboard">
                    <img
                        alt="pelican-logo"
                        className={classes.logo}
                        src={logo}
                    />
                </a>
                <Toolbar>
                    <List className={classes.menuList}>
                        {menuArr.map((text, index) => (
                            <ListItem
                                className={classes.menuItem}
                                button
                                key={text}
                            >
                                <a href={text}>
                                    <ListItemText primary={text} />
                                </a>
                            </ListItem>
                        ))}
                        {logoutButton}
                    </List>
                    <Grid
                        component="label"
                        container
                        spacing={1}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Grid item>light</Grid>
                        <Grid item>
                            <Switch color="default" onChange={handleChange} />
                        </Grid>
                        <Grid item>dark</Grid>
                    </Grid>
                    <div>
                        {['right'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <Button
                                    className={classes.hamburger}
                                    onClick={toggleDrawer(anchor, true)}
                                >
                                    <MenuIcon />
                                </Button>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                    className={classes.menuDrawer}
                                >
                                    {list(anchor)}
                                </SwipeableDrawer>
                            </React.Fragment>
                        ))}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );

    async function logout() {
        await Firebase.logout();
    }
}
