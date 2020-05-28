import React, { useEffect } from 'react';
import Firebase from '../../services/Firebase';
import { withRouter } from 'react-router-dom';
import Navbar from '../Nav/navbar';
import { useTheme } from '@material-ui/core/styles';
import FlexColumn from '../layouts/flex-column';
import RouteBar from './charts/route-bar';
import BoulderingBar from './charts/boulder-bar';
import RouteLine from './charts/route-line';
import VolumeBar from './charts/volume-bar';
import NameTitle from './modules/name-title';
import StatsTable from './modules/stats-table';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddAscent from './modules/add-new-ascent';

const useStyles = makeStyles((theme) => ({
    statsWrapper: {
        justifyContent: 'center',
        height: '76vh',
        [theme.breakpoints.up('md')]: {
            height: '40vh',
        },
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: '10%',
    },
    barChartsRow: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '120vh',
        width: '100%',
        paddingBottom: '15px',
        [theme.breakpoints.up('md')]: {
            height: '60vh',
            width: '100%',
            flexDirection: 'row',
            marginTop: '10%',
        },
    },
    barChartsCol: {
        height: '89%',
        width: '100%',
        boxShadow: '2px 2px 15px',
        marginTop: '32px',
        backgroundColor: theme.palette.primary.main,
    },
    lineChartCol: {
        display: 'flex',
        flexDirection: 'row',
        height: '85%',
        width: '100%',
        boxShadow: '2px 2px 15px',
        marginTop: '32px',
        backgroundColor: theme.palette.primary.main,
    },
    volumeChartCol: {
        height: '80%',
        width: '100%',
        boxShadow: '2px 2px 15px',
        backgroundColor: theme.palette.primary.main,
    },
    barChartOuter: {
        height: '45%',
        width: '90%',
        marginBottom: '5%',
        [theme.breakpoints.up('md')]: {
            height: '100%',
            width: '40%',
        },
    },
    lineChartOuter: {
        height: '40vh',
        width: '90%',
        [theme.breakpoints.up('md')]: {
            height: '60vh',
            marginTop: '5%',
            width: '60%',
        },
    },
    volumeChartOuter: {
        height: '30vh',
        width: '90%',
        marginTop: '10%',
        [theme.breakpoints.up('md')]: {
            marginTop: '5%',
            height: '40vh',
            width: '60%',
        },
    },
}));

export default withRouter(function Dashboard(props) {
    const classes = useStyles();
    const theme = useTheme();
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
            <FlexColumn style={{ marginBottom: '15px' }}>
                <div className={classes.statsWrapper}>
                    <NameTitle />
                    <StatsTable />
                </div>
                <div className={classes.barChartsRow}>
                    <div className={classes.barChartOuter}>
                        <Typography variant="h2">
                            Route grade distribution
                        </Typography>
                        <div className={classes.barChartsCol}>
                            <RouteBar />
                        </div>
                    </div>
                    <div className={classes.barChartOuter}>
                        <Typography variant="h2">
                            Boulder grade distribution
                        </Typography>
                        <div className={classes.barChartsCol}>
                            <BoulderingBar />
                        </div>
                    </div>
                </div>
                <FlexColumn style={{ width: '100%', marginBottom: '25px' }}>
                    <div className={classes.lineChartOuter}>
                        <Typography variant="h2">
                            Route grade and ticktype over time
                        </Typography>
                        <div className={classes.lineChartCol}>
                            <RouteLine />
                        </div>
                    </div>
                    <div className={classes.volumeChartOuter}>
                        <Typography variant="h2">
                            Amount of ascents completed over time
                        </Typography>
                        <div
                            className={`${classes.lineChartCol} ${classes.volumeChartCol}`}
                        >
                            <VolumeBar />
                        </div>
                    </div>
                </FlexColumn>
                <AddAscent />
            </FlexColumn>
        </>
    );
});
