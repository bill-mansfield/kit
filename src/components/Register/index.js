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
        '& > label': {
            color: theme.palette.primary.main,
        },
    },
    submit: {
        marginTop: theme.spacing(3),
    },
}));

export default withRouter(function Register(props) {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [quote, setQuote] = useState('');
    const [waiting, setWaiting] = useState(false);

    return (
        <>
            <BackgroundImage />
            <AuthWrapper>
                <AuthInnerWrapper>
                    <IconAvatar />
                    <Typography variant="h1">Register Account</Typography>
                    <form
                        className={classes.form}
                        onSubmit={(e) => e.preventDefault() && false}
                    >
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input
                                id="name"
                                name="name"
                                autoComplete="off"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">
                                Email Address
                            </InputLabel>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="quote">
                                Your Favorite Quote
                            </InputLabel>
                            <Input
                                name="quote"
                                type="text"
                                id="quote"
                                autoComplete="off"
                                value={quote}
                                onChange={(e) => setQuote(e.target.value)}
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
                                onClick={onRegister}
                                className={classes.submit}
                            >
                                Register
                            </Button>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/login"
                            className={classes.submit}
                        >
                            Go back to Login
                        </Button>
                    </form>
                </AuthInnerWrapper>
            </AuthWrapper>
        </>
    );

    async function onRegister() {
        setWaiting(true);
        try {
            await Firebase.register(name, email, password);
            await Firebase.addQuote(quote);
            await Firebase.login(email, password);
            props.history.replace('/uploader');
        } catch (error) {
            alert(error.message);
        }
    }
});
