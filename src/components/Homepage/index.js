import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import BackgroundImage from '../layouts/background-image';
import AuthWrapper from '../layouts/auth-wrapper';
import AuthInnerWrapper from '../layouts/auth-inner-wrapper';
import FlexRow from '../layouts/flex-row';
import Firebase from '../../services/Firebase';

const useStyles = makeStyles((theme) => ({
    submit: {
        marginTop: theme.spacing(3),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '35%',
        },
    },
}));

export default function Homepage() {
    const classes = useStyles();

    const loginAsDemo = () => {
        Firebase.login('testdemo@account.com', 'hujiko');
    };

    return (
        <>
            <BackgroundImage />
            <AuthWrapper>
                <AuthInnerWrapper>
                    <Typography variant="h1">Hello Crusher!</Typography>
                    <Typography variant="h2">
                        Welcome to KIT, a place for you to keep all of your
                        rock climbing ascent data.
                    </Typography>
                    <FlexRow
                        style={{
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/register"
                            className={classes.submit}
                        >
                            Register
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/login"
                            className={classes.submit}
                        >
                            Login
                        </Button>
                    </FlexRow>
                    <FlexRow>
                        <Button
                            variant="contained"
                            component={Link}
                            onCLick={loginAsDemo()}
                            to="/demo"
                            className={classes.submit}
                        >
                            Demo
                        </Button>
                    </FlexRow>
                </AuthInnerWrapper>
            </AuthWrapper>
        </>
    );
}
