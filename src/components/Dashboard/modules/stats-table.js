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
            height: '22%',
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
                paddingLeft: theme.spacing(2),
            },
            '& > h2:nth-of-type(1)': {
                width: '70%',
                justifyContent: 'flex-start',
            },
            '& > h2:nth-of-type(2)': {
                width: '30%',
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
                }}
            >
                <div
                    className={classes.statsCol}
                    style={{
                        borderRight: `3px solid ${theme.palette.secondary.main}`,
                    }}
                >
                    <div style={{ justifyContent: 'center' }}>
                        <Typography variant="h2">Route Ascents</Typography>
                    </div>
                    <div>
                        <HardestRouteAscent />
                    </div>
                    <div>
                        <HardestFlash />
                    </div>
                    <div>
                        <HardestOnsight />
                    </div>
                </div>
                <div className={classes.statsCol}>
                    <div style={{ justifyContent: 'center' }}>
                        <Typography variant="h2">Boulder Ascents</Typography>
                    </div>
                    <div>
                        <HardestBoulderAscent />
                    </div>
                    <div>
                        <HardestBoulderFlash />
                    </div>
                </div>
            </FlexColumn>
            <div className={classes.statsCol}>
                <div>
                    <MetresClimbed />
                </div>
                <div>
                    <SuccessfulAscents />
                </div>
                <div>
                    <FavouriteAreas />
                </div>
            </div>
        </FlexRow>
    );
}
