import React, { useEffect } from 'react';
import Firebase from '../../services/Firebase';
import FlexRow from '../layouts/flex-row';
import FlexColumn from '../layouts/flex-column';
import UploaderComponent from '../Uploader/uploader';
import Navbar from '../Nav/navbar';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    skipButton: {
        marginTop: '5%',
    },
}));

export default function Uploader(props) {
    const classes = useStyles();

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
                }}
            >
                <div>
                    <Typography variant="h2">
                        Upload your data from theCrag.com here
                    </Typography>
                </div>
                <FlexRow style={{ width: '60%' }}>
                    <FlexColumn style={{ flexBasis: '60%' }}>
                        <UploaderComponent awaitingUpload />
                    </FlexColumn>
                </FlexRow>
                <div className={classes.skipButton}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/dashboard"
                    >
                        Skip this step
                    </Button>
                </div>
            </FlexColumn>
        </>
    );
}
