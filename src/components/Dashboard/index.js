import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../services/firebase';
import { withRouter } from 'react-router-dom';
import Navbar from '../Nav/navbar';
import FlexRow from '../layouts/flex-row';
import FlexColumn from '../layouts/flex-column';
import MetresClimbed from './stats/metres-climbed';
import HardestAscent from './stats/hardest-ascent';
import SuccessfulAscents from './stats/successful-ascents';
import HardestFlash from './stats/hardest-flash';
import HardestOnsight from './stats/hardest-onsight';
import FavouriteAreas from './stats/favourite-areas';


const useStyles = makeStyles((theme) => ({}));

export default withRouter(function Dashboard(props) {
    const classes = useStyles();
    const [quote, setQuote] = useState('');

    useEffect(() => {
        if (!firebase.getCurrentUsername()) {
            // not logged in
            alert('Please login first');
            props.history.replace('/login');
        } else {
            firebase.getCurrentUserQuote().then(setQuote);
        }
    }, [quote]);
    
    return (
        <>
            <Navbar />
            <FlexColumn 
                style={{
                    justifyContent: 'center',
                    height: '91vh',
                }}
            >
                <FlexRow>
                    <FlexColumn>
                        <Typography variant="h1">
                            Hello {firebase.getCurrentUsername()}, welcome to
                            your dashboard
                        </Typography>
                        <Typography variant="h2">
                            Your quote:{' '}
                            {quote ? (
                                `"${quote}"`
                            ) : (
                                <CircularProgress size={20} />
                            )}
                        </Typography>
                    </FlexColumn>
                </FlexRow>
                <FlexRow>
                    <FlexColumn>
                        <MetresClimbed />
                        <SuccessfulAscents />
                        <HardestAscent />
                        <HardestFlash />
                        <HardestOnsight />
                        <FavouriteAreas />
                    </FlexColumn>
                </FlexRow>
            </FlexColumn>
        </>
    );
});
