import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import bgImage from '../../assets/homebg.jpg';

const useStyles = makeStyles(theme => ({
	backgroundImageBox: {
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        backgroundImage: `url("${bgImage}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }
}));

export default function BackgroundImage() {
	const classes = useStyles();

	return (
        <Box className={classes.backgroundImageBox} />
	)
}