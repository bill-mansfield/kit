import React from 'react';
import { makeStyles } from '@material-ui/styles';
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
    statsBlock: (styles) => ({
        justifyContent: 'flex-start',
        ...styles,
    }),
}));

export default function StatsTable(props) {
    const { styles, ...innerProps } = props;
    const classes = useStyles(styles);

    return (
        <FlexRow style={{ justifyContent: 'flex-start' }}>
            <FlexColumn style={{ flexDirection: 'row' }}>
                <FlexColumn className={classes.flexColumn} {...innerProps}>
                    <HardestRouteAscent />
                    <HardestFlash />
                    <HardestOnsight />
                </FlexColumn>
                <FlexColumn>
                    <HardestBoulderAscent />
                    <HardestBoulderFlash />
                </FlexColumn>
            </FlexColumn>
            <FlexColumn>
                <MetresClimbed />
                <SuccessfulAscents />
                <FavouriteAreas />
            </FlexColumn>
        </FlexRow>
    );
}
