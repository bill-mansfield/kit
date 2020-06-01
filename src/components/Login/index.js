import React, { useState } from 'react';
import {
    Typography,
    Button,
    FormControl,
    Input,
    InputLabel,
    CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import Firebase from '../../services/Firebase';
import BackgroundImage from '../layouts/background-image';
import AuthWrapper from '../layouts/auth-wrapper';
import AuthInnerWrapper from '../layouts/auth-inner-wrapper';
import IconAvatar from '../icon-avatar';
import FlexRow from '../layouts/flex-row';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '50%',
    },
    submit: {
        marginTop: theme.spacing(3),
    },
}));

export default withRouter(function SignIn(props) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [waiting, setWaiting] = useState(false);

    return (
        <>
            <BackgroundImage />
            <AuthWrapper>
                <AuthInnerWrapper>
                    <Typography variant="h1">Sign in</Typography>
                    <form
                        className={classes.form}
                        onSubmit={(e) => e.preventDefault() && false}
                    >
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">
                                Email Address
                            </InputLabel>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="off"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">
                                Password
                            </InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        {waiting ? (
                            <FlexRow>
                                <CircularProgress size={20} />
                            </FlexRow>
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={login}
                                className={classes.submit}
                            >
                                Sign in
                            </Button>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/register"
                            className={classes.submit}
                        >
                            Register
                        </Button>
                    </form>
                </AuthInnerWrapper>
            </AuthWrapper>
        </>
    );

    async function login() {
        setWaiting(true);
        try {
            await Firebase.login(email, password);
            props.history.replace('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    }
});
