import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../../services/Firebase';
import { withRouter } from 'react-router-dom';
import Navbar from '../Nav/navbar';
import FlexRow from '../layouts/flex-row';
import FlexColumn from '../layouts/flex-column';
import MetresClimbed from './stats/metres-climbed';
import HardestAscents from './stats/hardest-ascents';
import SuccessfulAscents from './stats/successful-ascents';
import HardestFlash from './stats/hardest-flash';
import HardestOnsight from './stats/hardest-onsight';
import FavouriteAreas from './stats/favourite-areas';
import RouteBar from './charts/route-bar';
import BoulderingBar from './charts/boulder-bar';
import RouteLine from './charts/route-line';
import VolumeBar from './charts/volume-bar';

const useStyles = makeStyles((theme) => ({}));

export default withRouter(function Dashboard(props) {
    const classes = useStyles();
    const [quote, setQuote] = useState('');

    useEffect(() => {
        if (!Firebase.getCurrentUsername()) {
            // not logged in
            alert('Please login first');
            props.history.replace('/login');
        }
    }, [props.history, quote]);

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
                            Hello {Firebase.getCurrentUsername()}, welcome to
                            your dashboard
                        </Typography>
                    </FlexColumn>
                </FlexRow>
                <FlexRow>
                    <FlexColumn>
                        <MetresClimbed />
                        <SuccessfulAscents />
                        <HardestAscents />
                        <HardestFlash />
                        <HardestOnsight />
                        <FavouriteAreas />
                    </FlexColumn>
                </FlexRow>
            </FlexColumn>
            <FlexColumn
                style={{
                    height: '140vh',
                }}
            >
                <FlexRow
                    style={{
                        height: '60vh',
                        width: '66vw',
                    }}
                >
                    {/* <RouteLine /> */}
                </FlexRow>
                <FlexRow
                    style={{
                        height: '20vh',
                        width: '66vw',
                    }}
                >
                    {/* <VolumeBar /> */}
                </FlexRow>
            </FlexColumn>
            <FlexColumn
                style={{
                    height: '65vh',
                }}
            >
                <FlexRow
                    style={{
                        height: '60vh',
                        width: '66vw',
                    }}
                >
                    <RouteBar />
                    <BoulderingBar />
                </FlexRow>
            </FlexColumn>
        </>
    );
});
