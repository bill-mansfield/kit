import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';


const useStyles = makeStyles(theme => ({
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
}));

export default function IconAvatar() {
	const classes = useStyles();

	return (
        <Avatar className={classes.avatar}>
            <VerifiedUserOutlined />
        </Avatar>
	)
}