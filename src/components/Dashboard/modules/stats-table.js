import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import FlexRow from '../../layouts/flex-row';
import FlexColumn from '../../layouts/flex-column';
import MetresClimbed from '../stats/metres-climbed';
import HardestRouteAscent from '../stats/hardest-route-ascent';
import HardestBoulderAscent from '../stats/hardest-boulder-ascent';
import HardestBoulderFlash from '../stats/hardest-boulder-flash';
import SuccessfulAscents from '../stats/successful-ascents';
import HardestFlash from '../stats/hardest-flash';
import HardestOnsight from '../stats/hardest-onsight';
import FavouriteAreas from '../stats/favourite-areas';

const useStyles = makeStyles((theme) => ({
    statsCol: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: '100%',
        '& > div': {
            height: '25%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottom: `3px solid ${theme.palette.secondary.main}`,
            '& > h2': {
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: theme.spacing(2),
            },
            '& > h2:nth-of-type(1)': {
                width: '70%',
                justifyContent: 'flex-start',
            },
            '& > h2:nth-of-type(2)': {
                width: '30%',
                borderLeft: `3px solid ${theme.palette.secondary.main}`,
            },
        },
    },
}));

export default function StatsTable(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <FlexRow
            style={{
                marginTop: theme.spacing(4),
                justifyContent: 'space-between',
                height: '30vh',
            }}
        >
            <FlexColumn
                style={{
                    flexDirection: 'row',
                    backgroundColor: theme.palette.primary.main,
                    width: '60%',
                    boxShadow: '2px 2px 15px',
                }}
            >
                <div
                    className={classes.statsCol}
                    style={{
                        borderRight: `3px solid ${theme.palette.secondary.main}`,
                        width: '100%',
                    }}
                >
                    <div style={{ justifyContent: 'center' }}>
                        <Typography
                            style={{
                                width: '100%',
                                padding: '0',
                                justifyContent: 'center',
                            }}
                            variant="h2"
                        >
                            Route Ascents
                        </Typography>
                    </div>
                    <div>
                        <HardestRouteAscent />
                    </div>
                    <div>
                        <HardestFlash />
                    </div>
                    <div style={{ borderBottom: 'none' }}>
                        <HardestOnsight />
                    </div>
                </div>
                <div
                    className={classes.statsCol}
                    style={{
                        width: '100%',
                    }}
                >
                    <div style={{ justifyContent: 'center' }}>
                        <Typography
                            variant="h2"
                            style={{
                                width: '100%',
                                padding: '0',
                                justifyContent: 'center',
                            }}
                        >
                            Boulder Ascents
                        </Typography>
                    </div>
                    <div>
                        <HardestBoulderAscent />
                    </div>
                    <div>
                        <HardestBoulderFlash />
                    </div>
                    <div style={{ borderBottom: 'none' }}>
                        <Typography variant="h2">Tallest boulder:</Typography>
                    </div>
                </div>
            </FlexColumn>
            <div
                style={{
                    width: '35%',
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: '2px 2px 15px',
                }}
                className={classes.statsCol}
            >
                <div>
                    <MetresClimbed />
                </div>
                <div>
                    <SuccessfulAscents />
                </div>
                <div
                    style={{
                        borderBottom: 'none',
                        height: '10%',
                        marginTop: '5px',
                    }}
                >
                    <Typography variant="h2">Your climbing areas:</Typography>
                </div>
                <FavouriteAreas />
            </div>
        </FlexRow>
    );
}
