import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    uploader: {
        backgroundColor: theme.palette.secondary.light,
    }

}));

export default function Uploader(props) {
    const classes = useStyles();
    const children = props;


    // function writeJsonString(json) {
    //     firebase.database().ref('jsonString/').set({
    //     jsonString: json
    //     });
    // }

    // var putFile = file;
    // Papa.parse(file, {
    //     complete: function(results) {
    //     writeJsonString(JSON.stringify(results));
    //     console.log(results);
    //     }
    // });



	return (
        <div className={classes.uploader} 
            { ...children }
        />
	)
}