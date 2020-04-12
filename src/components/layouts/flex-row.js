import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }

}));

export default function FlexRow(props) {
    const classes = useStyles();
    const children = props;

	return (
        <div className={classes.flexRow} 
            { ...children }
        />
	)
}