import React, { useEffect } from 'react';
import Firebase from '../../services/Firebase';
import { withRouter } from 'react-router-dom';
import Navbar from '../Nav/navbar';
import FlexRow from '../layouts/flex-row';
import FlexColumn from '../layouts/flex-column';
import RouteBar from './charts/route-bar';
import BoulderingBar from './charts/boulder-bar';
import RouteLine from './charts/route-line';
import VolumeBar from './charts/volume-bar';
import NameTitle from './modules/name-title';
import StatsTable from './modules/stats-table';

export default withRouter(function Dashboard(props) {
    useEffect(() => {
        if (!Firebase.getCurrentUsername()) {
            // not logged in
            alert('Please login first');
            props.history.replace('/login');
        }
    }, [props.history]);

    return (
        <>
            <Navbar />
            <FlexColumn
                style={{
                    justifyContent: 'center',
                    height: '91vh',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                }}
            >
                <NameTitle />
                <StatsTable />
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
                    <RouteLine />
                </FlexRow>
                <FlexRow
                    style={{
                        height: '20vh',
                        width: '66vw',
                    }}
                >
                    <VolumeBar />
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
